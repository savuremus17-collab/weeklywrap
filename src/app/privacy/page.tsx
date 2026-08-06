import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | WeeklyWrap",
  description: "Privacy Policy for WeeklyWrap",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-24 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: June 2025</p>

        <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Introduction</h2>
            <p>
              WeeklyWrap ("we", "our", or "us") is committed to protecting your personal data. This Privacy Policy 
              explains how we collect, use, and protect your information when you use our Service. We comply with 
              the General Data Protection Regulation (GDPR) and Romanian data protection law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Data We Collect</h2>
            <p>We collect the following personal data:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-foreground">Name</strong> — provided during registration</li>
              <li><strong className="text-foreground">Email address</strong> — used for login and communications</li>
              <li><strong className="text-foreground">Payment information</strong> — processed securely by Stripe (we do not store card details)</li>
              <li><strong className="text-foreground">Usage data</strong> — how you interact with the Service (pages visited, features used)</li>
              <li><strong className="text-foreground">Technical data</strong> — IP address, browser type, device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. How We Use Your Data</h2>
            <p>We use your personal data to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Create and manage your account</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send transactional emails (account confirmation, receipts)</li>
              <li>Provide customer support</li>
              <li>Improve and develop the Service</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Legal Basis for Processing (GDPR)</h2>
            <p>We process your data based on the following legal grounds:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-foreground">Contract</strong> — to provide the Service you signed up for</li>
              <li><strong className="text-foreground">Legitimate interest</strong> — to improve the Service and prevent fraud</li>
              <li><strong className="text-foreground">Legal obligation</strong> — to comply with applicable laws</li>
              <li><strong className="text-foreground">Consent</strong> — for marketing communications (you can withdraw at any time)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Third-Party Services</h2>
            <p>We use the following trusted third-party services that may process your data:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-foreground">Supabase</strong> — authentication and database hosting</li>
              <li><strong className="text-foreground">Stripe</strong> — payment processing</li>
              <li><strong className="text-foreground">Vercel</strong> — hosting and infrastructure</li>
            </ul>
            <p className="mt-3">
              Each of these services has their own privacy policy and we only share the minimum data necessary 
              for them to provide their services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to provide the Service. 
              If you delete your account, we will delete your personal data within 30 days, except where we are 
              required to retain it for legal or financial compliance purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Your Rights (GDPR)</h2>
            <p>Under GDPR, you have the following rights:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-foreground">Access</strong> — request a copy of your personal data</li>
              <li><strong className="text-foreground">Rectification</strong> — correct inaccurate data</li>
              <li><strong className="text-foreground">Erasure</strong> — request deletion of your data ("right to be forgotten")</li>
              <li><strong className="text-foreground">Portability</strong> — receive your data in a portable format</li>
              <li><strong className="text-foreground">Objection</strong> — object to certain types of processing</li>
              <li><strong className="text-foreground">Restriction</strong> — request we limit how we use your data</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:weeklywrapsupport@gmail.com" className="text-primary hover:underline">
                weeklywrapsupport@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Cookies</h2>
            <p>
              WeeklyWrap uses essential cookies necessary for authentication and session management. We do not 
              use tracking or advertising cookies. By using the Service, you consent to the use of these 
              essential cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including encryption in 
              transit (HTTPS) and at rest. However, no method of transmission over the internet is 100% secure 
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">10. Children's Privacy</h2>
            <p>
              WeeklyWrap is not intended for users under the age of 18. We do not knowingly collect personal 
              data from minors. If you believe a minor has provided us with personal data, please contact us 
              immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes 
              via email or a notice on the Service. Continued use of the Service after changes constitutes 
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">12. Contact</h2>
            <p>
              For any privacy-related questions or to exercise your rights, contact us at{" "}
              <a href="mailto:weeklywrapsupport@gmail.com" className="text-primary hover:underline">
                weeklywrapsupport@gmail.com
              </a>.
            </p>
            <p className="mt-3">
              You also have the right to lodge a complaint with the Romanian National Supervisory Authority 
              for Personal Data Processing (ANSPDCP) at{" "}
              <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                www.dataprotection.ro
              </a>.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/" className="text-primary hover:underline text-sm">
            ← Back to WeeklyWrap
          </Link>
        </div>
      </div>
    </div>
  );
}
