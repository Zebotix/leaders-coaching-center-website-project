import React, { JSX } from 'react';
import Head from 'next/head';

export default function PrivacyPolicy(): JSX.Element {
  const effectiveDate = 'November 16, 2025'; // replace with actual effective date

  return (
    <>
      <Head>
        <title>Privacy Policy — Leaders Coaching Center</title>
        <meta
          name='description'
          content='Privacy Policy for Leaders Coaching Center — how we collect, use, share and protect student and visitor information.'
        />
      </Head>

      <main className='min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6'>
        <div className='max-w-4xl mx-auto bg-white/90 backdrop-blur-sm border border-blue-50 rounded-2xl shadow-lg p-8'>
          <h1 className='text-3xl font-bold text-slate-800 mb-3'>Privacy Policy</h1>
          <p className='text-sm text-slate-600 mb-6'>
            Effective date: <strong>{effectiveDate}</strong>
          </p>

          <section className='space-y-4'>
            <p className='text-slate-700 leading-relaxed'>
              Welcome to <strong>Leaders Coaching Center</strong> ("we", "us", "our"). We are
              committed to protecting the privacy of students, parents, website visitors, and anyone
              who uses our services. This Privacy Policy explains what information we collect, why
              we collect it, how we use it, and the choices you have.
            </p>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>1. Information We Collect</h2>
            <ul className='list-disc list-inside text-slate-700'>
              <li>
                <strong>Personal information</strong>: name, email address, phone number, postal
                address, and other contact details you provide when you register or contact us.
              </li>
              <li>
                <strong>Student details</strong>: class/grade (9th–12th), subjects, enrollment
                information, attendance records, performance and progress notes (if you provide them
                or enroll in our coaching).
              </li>
              <li>
                <strong>Resources & uploads</strong>: files you upload or provide (assignments,
                documents) when using our services.
              </li>
              <li>
                <strong>Usage data</strong>: information about how you use our website and services
                (pages visited, resources downloaded, device and browser details, IP address, and
                timestamps).
              </li>
              <li>
                <strong>Payment & billing</strong>: We do not store payment card details. Payment
                processing (if any) is performed by third-party payment providers; only the minimum
                billing data we need (receipt, transaction id) is stored for records, unless
                otherwise required by law.
              </li>
            </ul>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>
              2. How We Collect Information
            </h2>
            <p className='text-slate-700 leading-relaxed'>We collect information when you:</p>
            <ul className='list-disc list-inside text-slate-700'>
              <li>Register for classes or newsletters;</li>
              <li>Submit contact, enquiry or enrollment forms;</li>
              <li>Upload assignments or resources;</li>
              <li>Use or interact with our website and hosted resources;</li>
              <li>Communicate with us via email, phone or secure messaging channels.</li>
            </ul>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>
              3. How We Use Your Information
            </h2>
            <p className='text-slate-700 leading-relaxed'>We use collected information to:</p>
            <ul className='list-disc list-inside text-slate-700'>
              <li>Provide and personalize coaching, study materials, and resources;</li>
              <li>Manage enrollments, schedules, attendance and academic progress;</li>
              <li>Answer enquiries, send important notices and administrative messages;</li>
              <li>
                Improve and maintain our website and services (analytics, debugging, performance);
              </li>
              <li>Comply with legal obligations and protect our rights; and</li>
              <li>
                Send marketing or promotional messages only when you have given consent — you can
                opt out at any time.
              </li>
            </ul>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>4. Sharing & Disclosure</h2>
            <p className='text-slate-700 leading-relaxed'>
              We will not sell your personal information. We may share data with:
            </p>
            <ul className='list-disc list-inside text-slate-700'>
              <li>
                <strong>Service providers</strong> who perform services on our behalf (payment
                processors, email providers, hosting providers). They are contractually prohibited
                from using your data for other purposes.
              </li>
              <li>
                <strong>Legal & regulatory authorities</strong> when required by law, court order,
                or to protect rights, safety or property.
              </li>
              <li>
                <strong>With your consent</strong> — e.g., if you ask us to share records with a
                third party.
              </li>
            </ul>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>5. Cookies & Tracking</h2>
            <p className='text-slate-700 leading-relaxed'>
              We use cookies and similar technologies to remember preferences, analyze usage, and
              optimize our website. You can control or disable cookies through your browser
              settings, but some features may not work correctly if cookies are disabled.
            </p>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>6. Data Security</h2>
            <p className='text-slate-700 leading-relaxed'>
              We implement reasonable administrative, technical, and physical safeguards to protect
              personal information. We use secure channels for messages and communications. While we
              strive to protect your data, no system is completely secure — we cannot guarantee
              absolute security.
            </p>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>7. Data Retention</h2>
            <p className='text-slate-700 leading-relaxed'>
              We retain personal data only as long as needed to provide services, meet legal
              obligations, resolve disputes, and enforce agreements. If you would like us to delete
              your personal information sooner, please contact us (see contact section).
            </p>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>8. Children’s Privacy</h2>
            <p className='text-slate-700 leading-relaxed'>
              Our services are intended for students in grades 9–12. If you are under the age
              required to provide consent in your country, please obtain parental or guardian
              consent before providing personal information. If you believe we have collected data
              from a child without consent, contact us and we will promptly investigate and remove
              the information if appropriate.
            </p>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>9. Your Rights & Choices</h2>
            <p className='text-slate-700 leading-relaxed'>
              Depending on where you live, you may have the right to access, correct, export,
              restrict processing, or delete your personal data. You may also object to or withdraw
              consent where processing is based on consent. To exercise these rights, contact us
              using the details below. We will respond in accordance with applicable law.
            </p>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>
              10. Third-Party Links & Embedded Content
            </h2>
            <p className='text-slate-700 leading-relaxed'>
              Our website may contain links to third-party websites or embedded content (videos,
              forms, or learning platforms). Those sites have their own privacy practices — we are
              not responsible for their content or policies. We encourage you to read the privacy
              policies of any third-party sites you visit.
            </p>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>
              11. International Transfers
            </h2>
            <p className='text-slate-700 leading-relaxed'>
              If we transfer personal data to service providers or affiliates located outside your
              country, we will take appropriate steps to ensure adequate safeguards are in place to
              protect your information.
            </p>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>
              12. Changes to This Policy
            </h2>
            <p className='text-slate-700 leading-relaxed'>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              "Effective date" at the top and, where appropriate, notify users of material changes.
            </p>

            <h2 className='text-xl font-semibold text-slate-800 mt-4'>13. Contact Us</h2>
            <p className='text-slate-700 leading-relaxed'>
              If you have questions about this Privacy Policy or want to exercise your privacy
              rights, contact:
            </p>
            <div className='mt-2 text-sm text-slate-700'>
              <p>Leaders Coaching Center</p>
              <p>
                Email:{' '}
                <a href={`mailto:${process.env.ADMIN_EMAIL}'`} className='text-indigo-600'>
                  {process.env.ADMIN_EMAIL}
                </a>
              </p>
              <p>Phone: +92 313 2061329 </p>
              <p>Address: Sector 5-J Sector 5 Baldia, Karachi</p>
            </div>

            <p className='text-xs text-slate-500 mt-6'>
              This policy is provided as a general template and does not constitute legal advice. We
              recommend that you have the final policy reviewed by a legal professional to ensure
              compliance with local laws and regulations.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
