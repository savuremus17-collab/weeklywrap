(function(){

  function ensurePdfJsWorker(){
    if(window.pdfjsLib && !pdfjsLib.GlobalWorkerOptions.workerSrc){
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";
    }
  }
  ensurePdfJsWorker();

  function fmtBytes(n){
    if(n < 1024) return n + ' B';
    if(n < 1024*1024) return (n/1024).toFixed(0) + ' KB';
    return (n/1024/1024).toFixed(2) + ' MB';
  }
  function bytesFromDataUrl(dataUrl){ return fetch(dataUrl).then(r=>r.arrayBuffer()); }

  async function renderPageToJpeg(pdfPage, scale, quality){
    const viewport = pdfPage.getViewport({scale});
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width; canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
    await pdfPage.render({canvasContext: ctx, viewport}).promise;
    return { dataUrl: canvas.toDataURL('image/jpeg', quality), width: canvas.width, height: canvas.height };
  }

  async function embedViaCanvas(pdfDoc, file){
    if(file.type === 'image/jpeg'){
      const bytes = await file.arrayBuffer();
      return await pdfDoc.embedJpg(bytes);
    }
    const dataUrl = await new Promise((res,rej)=>{
      const reader = new FileReader();
      reader.onload = ()=> res(reader.result);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });
    const imgEl = await new Promise((res,rej)=>{
      const im = new Image();
      im.onload = ()=>res(im); im.onerror = rej; im.src = dataUrl;
    });
    const canvas = document.createElement('canvas');
    canvas.width = imgEl.naturalWidth; canvas.height = imgEl.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(imgEl,0,0);
    const jpegUrl = canvas.toDataURL('image/jpeg', 0.92);
    const jpegBytes = await (await fetch(jpegUrl)).arrayBuffer();
    return await pdfDoc.embedJpg(jpegBytes);
  }

  // ============ Generic multi-file stack tool (used by Images->PDF and Merge PDF) ============
  function setupStackTool(cfg){
    const dz = document.getElementById(cfg.dz);
    if(!dz) return; // this page doesn't have this tool — skip silently

    let files = []; let idSeq = 0;
    const input = document.getElementById(cfg.input);
    const stack = document.getElementById(cfg.stack);
    const hint = document.getElementById(cfg.hint);
    const count = document.getElementById(cfg.count);
    const btn = document.getElementById(cfg.btn);
    const clearBtn = document.getElementById(cfg.clearBtn);
    const status = document.getElementById(cfg.status);
    const result = document.getElementById(cfg.result);
    const rname = document.getElementById(cfg.rname);
    const dl = document.getElementById(cfg.dl);

    dz.addEventListener('click', ()=>input.click());
    dz.addEventListener('dragover', e=>{e.preventDefault(); dz.classList.add('drag');});
    dz.addEventListener('dragleave', ()=> dz.classList.remove('drag'));
    dz.addEventListener('drop', e=>{
      e.preventDefault(); dz.classList.remove('drag');
      addFiles(Array.from(e.dataTransfer.files).filter(cfg.accept));
    });
    input.addEventListener('change', e=>{
      addFiles(Array.from(e.target.files).filter(cfg.accept));
      input.value = '';
    });

    function addFiles(list){ list.forEach(f=> files.push({file:f, id: idSeq++})); render(); }
    function removeFile(id){ files = files.filter(x=>x.id!==id); render(); }

    let dragSrcId = null;
    function render(){
      stack.innerHTML = '';
      status.textContent=''; status.classList.remove('err');
      result.classList.remove('show');

      files.forEach((entry, idx)=>{
        const card = document.createElement('div');
        card.className='card'; card.draggable = true; card.dataset.id = entry.id;

        const tag = document.createElement('span');
        tag.className='tag'; tag.textContent = cfg.pageLabel + (idx+1);
        card.appendChild(tag);

        const thumb = document.createElement('div');
        thumb.className='thumb';
        if(cfg.type==='img'){
          const img = document.createElement('img');
          img.src = URL.createObjectURL(entry.file);
          thumb.appendChild(img);
        } else {
          thumb.classList.add('pdf-icon');
          thumb.innerHTML = '<span>PDF</span>';
        }
        card.appendChild(thumb);

        const fname = document.createElement('div');
        fname.className='fname'; fname.textContent = entry.file.name;
        card.appendChild(fname);

        const rm = document.createElement('div');
        rm.className='remove'; rm.textContent='×';
        rm.addEventListener('click', (e)=>{ e.stopPropagation(); removeFile(entry.id); });
        card.appendChild(rm);

        card.addEventListener('dragstart', ()=>{ dragSrcId = entry.id; card.classList.add('dragging'); });
        card.addEventListener('dragend', ()=> card.classList.remove('dragging'));
        card.addEventListener('dragover', e=> e.preventDefault());
        card.addEventListener('drop', e=>{
          e.preventDefault();
          if(dragSrcId===null || dragSrcId===entry.id) return;
          const srcIdx = files.findIndex(x=>x.id===dragSrcId);
          const tgtIdx = files.findIndex(x=>x.id===entry.id);
          const [moved] = files.splice(srcIdx,1);
          files.splice(tgtIdx,0,moved);
          render();
        });

        stack.appendChild(card);
      });

      hint.style.display = files.length ? 'flex' : 'none';
      clearBtn.style.display = files.length ? 'inline-block' : 'none';
      count.textContent = files.length + (files.length===1 ? cfg.unitSingular : cfg.unitPlural);
      btn.disabled = files.length < cfg.minFiles;
    }

    clearBtn.addEventListener('click', ()=>{ files=[]; render(); });

    btn.addEventListener('click', async ()=>{
      btn.disabled = true; status.classList.remove('err'); status.textContent = cfg.strings.processing;
      try{
        const bytes = await cfg.process(files.map(x=>x.file), (msg)=>{ status.textContent = msg; });
        const blob = new Blob([bytes], {type:'application/pdf'});
        const url = URL.createObjectURL(blob);
        dl.href = url; dl.download = cfg.outName;
        rname.textContent = cfg.outName;
        result.classList.add('show');
        status.textContent = cfg.strings.done;
      }catch(err){
        console.error(err);
        status.textContent = cfg.strings.error + err.message;
        status.classList.add('err');
      }
      btn.disabled = files.length < cfg.minFiles;
    });

    render();
  }

  // ============ Compress PDF ============
  function setupCompressTool(cfg){
    const dz = document.getElementById(cfg.dz);
    if(!dz) return;

    const input = document.getElementById(cfg.input);
    const stack = document.getElementById(cfg.stack);
    const qualityRow = document.getElementById(cfg.qualityRow);
    const btn = document.getElementById(cfg.btn);
    const clearBtn = document.getElementById(cfg.clearBtn);
    const status = document.getElementById(cfg.status);
    const result = document.getElementById(cfg.result);
    const rname = document.getElementById(cfg.rname);
    const dl = document.getElementById(cfg.dl);

    let file = null; let level = 'medium';
    const presets = { low:{scale:0.7,quality:0.42}, medium:{scale:1.0,quality:0.62}, high:{scale:1.4,quality:0.8} };

    document.querySelectorAll('#'+cfg.qualityRow+' .q-opt').forEach(opt=>{
      opt.addEventListener('click', ()=>{
        document.querySelectorAll('#'+cfg.qualityRow+' .q-opt').forEach(o=>o.classList.remove('active'));
        opt.classList.add('active'); level = opt.dataset.q;
      });
    });

    dz.addEventListener('click', ()=>input.click());
    dz.addEventListener('dragover', e=>{e.preventDefault(); dz.classList.add('drag');});
    dz.addEventListener('dragleave', ()=> dz.classList.remove('drag'));
    dz.addEventListener('drop', e=>{
      e.preventDefault(); dz.classList.remove('drag');
      const f = Array.from(e.dataTransfer.files).find(f=>f.type==='application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
      if(f) setFile(f);
    });
    input.addEventListener('change', e=>{ if(e.target.files[0]) setFile(e.target.files[0]); input.value=''; });

    function setFile(f){
      file = f; stack.innerHTML = '';
      const card = document.createElement('div');
      card.className='card'; card.style.transform='rotate(-1deg)';
      card.innerHTML = `<span class="tag">${fmtBytes(f.size)}</span><div class="thumb pdf-icon"><span>PDF</span></div><div class="fname">${f.name}</div>`;
      const rm = document.createElement('div');
      rm.className='remove'; rm.textContent='×'; rm.style.opacity='1';
      rm.addEventListener('click', reset);
      card.appendChild(rm); stack.appendChild(card);
      qualityRow.style.display='block'; btn.disabled = false; clearBtn.style.display='inline-block';
      status.textContent=''; result.classList.remove('show');
    }
    function reset(){ file=null; stack.innerHTML=''; qualityRow.style.display='none'; btn.disabled=true; clearBtn.style.display='none'; result.classList.remove('show'); }
    clearBtn.addEventListener('click', reset);

    btn.addEventListener('click', async ()=>{
      if(!file) return;
      btn.disabled = true; status.classList.remove('err'); status.textContent = cfg.strings.loading;
      try{
        const originalSize = file.size;
        const bytes = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({data: bytes}).promise;
        const preset = presets[level];
        const outDoc = await PDFLib.PDFDocument.create();

        for(let i=1;i<=pdf.numPages;i++){
          status.textContent = cfg.strings.compressing(i, pdf.numPages);
          const page = await pdf.getPage(i);
          const { dataUrl, width, height } = await renderPageToJpeg(page, preset.scale, preset.quality);
          const jpgBytes = await bytesFromDataUrl(dataUrl);
          const jpgImage = await outDoc.embedJpg(jpgBytes);
          const outPage = outDoc.addPage([width, height]);
          outPage.drawImage(jpgImage, {x:0, y:0, width, height});
        }

        const outBytes = await outDoc.save();
        const blob = new Blob([outBytes], {type:'application/pdf'});
        const url = URL.createObjectURL(blob);
        const outName = file.name.replace(/\.pdf$/i,'') + cfg.suffix;
        dl.href = url; dl.download = outName;

        const pct = Math.max(0, Math.round((1 - outBytes.length/originalSize)*100));
        rname.innerHTML = `<span>${outName}</span> &nbsp; <span class="size-compare">${fmtBytes(originalSize)} <span class="arrow">→</span> <span class="after">${fmtBytes(outBytes.length)}</span> ${pct>0 ? '· -'+pct+'%' : ''}</span>`;
        result.classList.add('show');
        status.textContent = cfg.strings.done;
      }catch(err){
        console.error(err);
        status.textContent = cfg.strings.error + err.message;
        status.classList.add('err');
      }
      btn.disabled = false;
    });
  }

  // ============ PDF to JPG ============
  function setupTopngTool(cfg){
    const dz = document.getElementById(cfg.dz);
    if(!dz) return;

    const input = document.getElementById(cfg.input);
    const stack = document.getElementById(cfg.stack);
    const hint = document.getElementById(cfg.hint);
    const count = document.getElementById(cfg.count);
    const btn = document.getElementById(cfg.btn);
    const clearBtn = document.getElementById(cfg.clearBtn);
    const status = document.getElementById(cfg.status);
    const grid = document.getElementById(cfg.grid);
    const zipActions = document.getElementById(cfg.zipActions);
    const btnZip = document.getElementById(cfg.btnZip);

    let file = null; let pageImages = [];

    dz.addEventListener('click', ()=>input.click());
    dz.addEventListener('dragover', e=>{e.preventDefault(); dz.classList.add('drag');});
    dz.addEventListener('dragleave', ()=> dz.classList.remove('drag'));
    dz.addEventListener('drop', e=>{
      e.preventDefault(); dz.classList.remove('drag');
      const f = Array.from(e.dataTransfer.files).find(f=>f.type==='application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
      if(f) setFile(f);
    });
    input.addEventListener('change', e=>{ if(e.target.files[0]) setFile(e.target.files[0]); input.value=''; });

    function reset(){
      file=null; pageImages=[]; stack.innerHTML=''; grid.innerHTML='';
      hint.style.display='none'; zipActions.style.display='none';
      btn.disabled=true; clearBtn.style.display='none'; status.textContent='';
    }

    function setFile(f){
      reset(); file = f;
      const card = document.createElement('div');
      card.className='card'; card.style.transform='rotate(-1deg)';
      card.innerHTML = `<span class="tag">${fmtBytes(f.size)}</span><div class="thumb pdf-icon"><span>PDF</span></div><div class="fname">${f.name}</div>`;
      const rm = document.createElement('div');
      rm.className='remove'; rm.textContent='×'; rm.style.opacity='1';
      rm.addEventListener('click', reset);
      card.appendChild(rm); stack.appendChild(card);
      hint.style.display='flex'; count.textContent = f.name;
      btn.disabled = false; clearBtn.style.display='inline-block';
    }
    clearBtn.addEventListener('click', reset);

    btn.addEventListener('click', async ()=>{
      if(!file) return;
      btn.disabled = true; grid.innerHTML=''; pageImages=[];
      status.classList.remove('err'); status.textContent = cfg.strings.loading;
      try{
        const bytes = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({data: bytes}).promise;
        const baseName = file.name.replace(/\.pdf$/i,'');

        for(let i=1;i<=pdf.numPages;i++){
          status.textContent = cfg.strings.converting(i, pdf.numPages);
          const page = await pdf.getPage(i);
          const { dataUrl } = await renderPageToJpeg(page, 1.8, 0.9);
          const jpgBytes = await bytesFromDataUrl(dataUrl);
          const pageName = `${baseName}${cfg.pageSuffix}${String(i).padStart(2,'0')}.jpg`;
          pageImages.push({name: pageName, bytes: jpgBytes});

          const pcard = document.createElement('div');
          pcard.className='page-card';
          const img = document.createElement('img'); img.src = dataUrl;
          const label = document.createElement('div');
          label.className='p-label'; label.textContent = cfg.pageLabel + i;
          const a = document.createElement('a');
          a.href = dataUrl; a.download = pageName; a.textContent = cfg.strings.download;
          pcard.appendChild(img); pcard.appendChild(label); pcard.appendChild(a);
          grid.appendChild(pcard);
        }

        status.textContent = cfg.strings.doneCount(pdf.numPages);
        if(pdf.numPages > 1) zipActions.style.display='flex';
      }catch(err){
        console.error(err);
        status.textContent = cfg.strings.error + err.message;
        status.classList.add('err');
      }
      btn.disabled = false;
    });

    btnZip.addEventListener('click', async ()=>{
      if(!pageImages.length) return;
      btnZip.disabled = true; btnZip.textContent = cfg.strings.zipping;
      const zip = new JSZip();
      pageImages.forEach(p=> zip.file(p.name, p.bytes));
      const blob = await zip.generateAsync({type:'blob'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = (file ? file.name.replace(/\.pdf$/i,'') : cfg.fallbackZipName) + '-jpg.zip';
      document.body.appendChild(a); a.click(); a.remove();
      btnZip.disabled = false; btnZip.textContent = cfg.strings.downloadAll;
    });
  }

  window.Teanc = { setupStackTool, setupCompressTool, setupTopngTool, embedViaCanvas, fmtBytes };

})();
