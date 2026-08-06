import Link from "next/link";

export const metadata = {
  title: "Terms of Service | WeeklyWrap",
  description: "Terms of Service for WeeklyWrap",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-24 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">Last updated: June 2025</p>

        <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using WeeklyWrap ("the Service"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use the Service. WeeklyWrap is operated by an 
              individual based in Romania and is subject to Romanian and European Union law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Description of Service</h2>
            <p>
              WeeklyWrap is an AI-powered platform that helps users generate weekly reports, client summaries, 
              and productivity insights. The Service is provided on a subscription basis with both free and paid plans.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Account Registration</h2>
            <p>
              To use WeeklyWrap, you must create an account by providing a valid email address and a password. 
              You are responsible for maintaining the confidentiality of your account credentials and for all 
              activities that occur under your account. You must be at least 18 years old to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Payments and Subscriptions</h2>
            <p>
              Paid plans are billed on a monthly or yearly basis. All payments are processed securely through 
              Stripe. By subscribing to a paid plan, you authorize WeeklyWrap to charge your payment method 
              on a recurring basis until you cancel. You may cancel your subscription at any time from your 
              account settings. Cancellations take effect at the end of the current billing period.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Refund Policy</h2>
            <p>
              We offer a 7-day money-back guarantee on all paid plans. If you are not satisfied with the Service 
              within the first 7 days of your paid subscription, contact us at{" "}
              <a href="mailto:weeklywrapsupport@gmail.com" className="text-primary hover:underline">
                weeklywrapsupport@gmail.com
              </a>{" "}
              and we will issue a full refund. Refunds are not available after the 7-day period.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Reverse engineer, copy, or redistribute any part of the Service</li>
              <li>Use the Service to generate spam or misleading content</li>
              <li>Share your account credentials with others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Intellectual Property</h2>
            <p>
              All content, features, and functionality of WeeklyWrap — including but not limited to the software, 
              design, text, and graphics — are the exclusive property of the creator of WeeklyWrap. You may not 
              reproduce, distribute, or create derivative works without explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Limitation of Liability</h2>
            <p>
              WeeklyWrap is provided "as is" without warranties of any kind. To the maximum extent permitted by law, 
              WeeklyWrap shall not be liable for any indirect, incidental, special, or consequential damages arising 
              from your use of the Service, including but not limited to loss of data or loss of profits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time if you violate these Terms of 
              Service. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of Romania and the European Union. Any disputes arising from 
              these Terms shall be subject to the exclusive jurisdiction of the courts of Romania.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">11. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. We will notify users of significant changes 
              via email or a notice on the Service. Continued use of the Service after changes constitutes 
              acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">12. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:weeklywrapsupport@gmail.com" className="text-primary hover:underline">
                weeklywrapsupport@gmail.com
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
