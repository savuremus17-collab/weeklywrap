"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users, Plus, Search, ArrowUpRight, Mail,
  FileText, MoreHorizontal, X, Loader2, Check,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Client } from "@/types/dashboard"

const initialClients: Client[] = [
  {
    id: "1",
    name: "Acme Corp",
    email: "sarah@acmecorp.com",
    company: "Acme Corporation",
    status: "active",
    projects: 3,
    reports: 14,
    lastActivity: "2 hours ago",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    name: "DesignStudio",
    email: "alex@designstudio.io",
    company: "DesignStudio Inc.",
    status: "active",
    projects: 2,
    reports: 11,
    lastActivity: "1 day ago",
    createdAt: "2025-02-20",
  },
  {
    id: "3",
    name: "TechFlow Inc",
    email: "mike@techflow.com",
    company: "TechFlow Corporation",
    status: "active",
    projects: 1,
    reports: 5,
    lastActivity: "3 days ago",
    createdAt: "2025-03-10",
  },
  {
    id: "4",
    name: "GrowthLabs",
    email: "emma@growthlabs.co",
    company: "GrowthLabs Co.",
    status: "active",
    projects: 2,
    reports: 8,
    lastActivity: "5 days ago",
    createdAt: "2025-01-28",
  },
  {
    id: "5",
    name: "Vertex Media",
    email: "jordan@vertexmedia.com",
    company: "Vertex Media Group",
    status: "archived",
    projects: 1,
    reports: 3,
    lastActivity: "2 months ago",
    createdAt: "2024-11-05",
  },
]

const getInitials = (name: string) => name.split(" ").map(w => w[0]).join("").slice(0, 2)

const getGradient = (name: string) => {
  const gradients = [
    "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400",
    "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-400",
    "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400",
    "from-amber-500/20 to-amber-600/20 border-amber-500/30 text-amber-400",
    "from-rose-500/20 to-rose-600/20 border-rose-500/30 text-rose-400",
  ]
  return gradients[name.length % gradients.length]
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [search, setSearch] = useState("")
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    company: "",
  })

  const handleAddClient = async () => {
    if (!newClient.name || !newClient.email) return
    setSaving(true)
    try {
      // Adauga in Supabase
      const { supabase } = await import("@/lib/supabase/client")
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not logged in")

      const { data, error } = await supabase
        .from("clients")
        .insert({
          user_id: user.id,
          name: newClient.name,
          email: newClient.email,
          company: newClient.company,
          status: "active",
        })
        .select()
        .single()

      if (error) throw error

      // Adauga local in lista
      const addedClient: Client = {
        id: data?.id || String(Date.now()),
        name: newClient.name,
        email: newClient.email,
        company: newClient.company,
        status: "active",
        projects: 0,
        reports: 0,
        lastActivity: "just now",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setClients((prev) => [addedClient, ...prev])
      setSavedSuccess(true)
      setTimeout(() => {
        setShowModal(false)
        setNewClient({ name: "", email: "", company: "" })
        setSavedSuccess(false)
      }, 1500)
    } catch (error: any) {
      alert("Error adding client: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  const filteredClients = clients.filter(c =>
    c.status === "active" &&
    (c.name.toLowerCase().includes(search.toLowerCase()) ||
     c.email.toLowerCase().includes(search.toLowerCase()) ||
     c.company.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-4"
          >
            <GlassCard intensity="low" className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
                    <Users className="h-5 w-5 text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold">Add New Client</h2>
                </div>
                <button onClick={() => { setShowModal(false); setNewClient({ name: "", email: "", company: "" }) }} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {savedSuccess ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-3">
                    <Check className="h-7 w-7 text-emerald-400" />
                  </div>
                  <p className="font-medium">Client added successfully!</p>
                  <p className="text-xs text-muted-foreground mt-1">{newClient.name} has been added to your clients.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Full Name <span className="text-red-400">*</span></label>
                      <Input
                        placeholder="e.g. John Smith"
                        value={newClient.name}
                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email <span className="text-red-400">*</span></label>
                      <Input
                        type="email"
                        placeholder="client@example.com"
                        value={newClient.email}
                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Company</label>
                      <Input
                        placeholder="e.g. Acme Corporation"
                        value={newClient.company}
                        onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => { setShowModal(false); setNewClient({ name: "", email: "", company: "" }) }}>
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 gap-2 bg-gradient-to-r from-blue-500 to-blue-700"
                      onClick={handleAddClient}
                      disabled={saving || !newClient.name || !newClient.email}
                    >
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                      {saving ? "Adding..." : "Add Client"}
                    </Button>
                  </div>
                </>
              )}
            </GlassCard>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your clients and their weekly reports.</p>
        </div>
        <Button
          className="h-9 gap-1.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-500/25"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
        <Input
          placeholder="Search clients..."
          className="pl-9 h-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Clients grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/dashboard/clients/${client.id}`}>
              <GlassCard intensity="low" className="p-5 group cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-border/40">
                      <AvatarFallback className={cn("bg-gradient-to-br text-sm font-bold", getGradient(client.name))}>
                        {getInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{client.name}</h3>
                      <p className="text-xs text-muted-foreground">{client.company}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {client.reports} reports
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {client.projects} projects
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                  <Mail className="h-3 w-3" />
                  {client.email}
                </div>
                <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground/50">Active {client.lastActivity}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Archived section */}
      {clients.filter(c => c.status === "archived").length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Archived Clients</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {clients.filter(c => c.status === "archived").map((client, index) => (
              <motion.div key={client.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <GlassCard intensity="low" className="p-5 opacity-60 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={cn("bg-gradient-to-br text-xs font-bold", getGradient(client.name))}>
                        {getInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-sm">{client.name}</h3>
                      <p className="text-xs text-muted-foreground">{client.email}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {clients.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/30 border border-border/40 mb-4">
            <Users className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <h3 className="text-lg font-semibold">No clients yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Add your first client to start generating reports.</p>
          <Button className="mt-4 gap-1.5" onClick={() => setShowModal(true)}>
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>
      )}
    </motion.div>
  )
}
