
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - Charis Eagle Springs</title>
        <meta name="description" content="Terms and conditions for using the Charis Eagle Springs website and services. Learn about our policies for mental health support programs for older persons." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://chariseaglesprings.org/terms" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-charis-blue-dark to-charis-purple bg-clip-text text-transparent mb-6">
                Terms and Conditions
              </h1>
              <p className="text-xl text-gray-700">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <Card className="shadow-lg">
              <CardContent className="p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-charis-blue-dark mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing and using the Charis Eagle Springs website (chariseaglesprings.org), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-charis-blue-dark mb-4">2. About Charis Eagle Springs</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Charis Eagle Springs is a registered nonprofit organization in Kenya, dedicated to promoting mental wellness for older persons through theatre and the arts. Our mission is to uphold dignity across aging and provide support for mental health challenges affecting older adults.
                  </p>
                  <div className="bg-charis-blue-light/10 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Organization Details:</strong><br />
                      Address: P.O. Box 62362-00200, Nairobi, Kenya<br />
                      Phone: +254 722 679 107<br />
                      Email: info@chariseaglesprings.org
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-charis-blue-dark mb-4">3. Use License</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Permission is granted to temporarily download one copy of the materials on Charis Eagle Springs' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                    <li>attempt to decompile or reverse engineer any software contained on the website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-charis-blue-dark mb-4">4. Disclaimer</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The materials on Charis Eagle Springs' website are provided on an 'as is' basis. Charis Eagle Springs makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> The information provided on this website is for educational and informational purposes only and is not intended as medical advice. Please consult with qualified healthcare professionals for medical concerns.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-charis-blue-dark mb-4">5. Privacy and Data Protection</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We are committed to protecting your privacy and personal information. When you use our website or participate in our programs:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>We collect only necessary information for program participation and communication</li>
                    <li>Personal information is kept confidential and secure</li>
                    <li>We do not sell or share personal information with third parties without consent</li>
                    <li>You have the right to request access to or deletion of your personal data</li>
                    <li>We comply with applicable data protection laws in Kenya</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-charis-blue-dark mb-4">6. Program Participation</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Participation in Charis Eagle Springs programs is subject to the following conditions:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Programs are open to older persons and their caregivers as specified</li>
                    <li>Participants must follow program guidelines and respect other participants</li>
                    <li>We reserve the right to exclude individuals who disrupt programs or violate guidelines</li>
                    <li>Photography or recording may occur during programs for documentation purposes</li>
                    <li>Participants will be informed of any photography and may opt out</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibent text-charis-blue-dark mb-4">7. Donations and Financial Contributions</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    All donations to Charis Eagle Springs are voluntary and support our mission of promoting mental wellness for older persons:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Donations are used exclusively for organizational programs and operations</li>
                    <li>Donors will receive acknowledgment of their contributions</li>
                    <li>Tax receipts will be provided where applicable under Kenyan law</li>
                    <li>We maintain transparency in the use of donated funds</li>
                    <li>Donation refunds are handled on a case-by-case basis</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-charis-blue-dark mb-4">8. Intellectual Property</h2>
                  <p className="text-gray-700 leading-relaxed">
                    All content on this website, including text, graphics, logos, images, and software, is the property of Charis Eagle Springs or its content suppliers and is protected by copyright laws. The Charis Eagle Springs name and logo are trademarks of the organization.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-charis-blue-dark mb-4">9. Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed">
                    In no event shall Charis Eagle Springs or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website, even if Charis Eagle Springs or its authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-charis-blue-dark mb-4">10. Governing Law</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These terms and conditions are governed by and construed in accordance with the laws of Kenya, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-charis-blue-dark mb-4">11. Changes to Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Charis Eagle Springs reserves the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms of service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-charis-blue-dark mb-4">12. Contact Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <div className="bg-charis-green-light/10 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Charis Eagle Springs</strong><br />
                      P.O. Box 62362-00200, Nairobi, Kenya<br />
                      Phone: +254 722 679 107<br />
                      Email: info@chariseaglesprings.org
                    </p>
                  </div>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Terms;
