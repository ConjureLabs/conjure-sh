import classnames from 'classnames';

import Layout from '../../components/Layout';

import styles, { classes } from './styles.js';

export default ({ url }) => (
  <Layout
    url={url}
    title='Terms of Service'
    className={classes.root}
    wrappedHeader={false}
  >
    <h2>Conjure Terms of Service</h2>

    <span className={classes.topNote}>Last updated November 19, 2017.</span>

    <div className={classes.section}>
      <p className={classes.loud}>The following terms of service (these <span className={classes.term}>"TOS"</span>) shall be deemed incorporated by reference into each other (as defined below) between Conjure Labs, Inc. a Delaware corporation DBA Conjure (<span className={classes.term}>"Conjure"</span> or <span className={classes.term}>"Company"</span> or <span className={classes.term}>"we"</span>) and the licensee identified therein (<span className={classes.term}>"Licensee"</span>).</p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>1.</span>
        <span className={classes.label}>Acceptance of Terms.</span>
        <span>Conjure provides its Services (as defined below) to you through (but not limtied to) its web site located at <a href='https://conjure.sh'>https://conjure.sh</a> (the <span className={classes.term}>"Site"</span>), pursuant to these TOS. By entering into a Service order form, or other ordering document, web-based or email-based ordering mechanism or registration process (each an <span className={classes.term}>"Order"</span>) or otherwise downloading, accessing or using the Service, Licensee unconditionally accepts and agrees to all of the terms of these TOS. Licensee represents that it has the authority to bind itself and its affiliates to the terms of these TOS, and, accordingly, the term "Licensee" shall refer to such entity. If Licensee is an individual using the Service, the terms "Licensee" and "User" shall each apply to such individual using the Service for the purposes of these TOS. Capitalized terms not defined herein shall be given the meaning set forth in the applicable Order. These TOS shall apply to all use by Licensee and Users (as defined below) of the Service. <span className={classes.term}>"User"</span> means an individual who is authorized by Licensee to use the Service, for whom Licensee (or Company at Licensee's request) has supplied a user identification and password either manually or using a Non-Company Application (as defined below) (e.g., GitHub via OAuth). Users may include, for example, Licensee's employees, consultants, contractors and agents, and third parties that Licensee transacts business. Company may change these TOS from time to time by providing Licensee and Users at least thirty (30) days notice either by emailing the email address associated with License's or User's account or by posting a notice on the Service. The revised TOS shall become effective thirty (30) days after Company posts the updated TOS on the Service or e-mails Licensee and/or Users notice of a change to these TOS. If any change to these TOS is not acceptable to a Licensee or a User, such User shall stop using the Service or, in the case of Licensee, shall send a cancellation e-mail to info@conjure.sh.</span>
      </p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>2.</span>
        <span className={classes.label}>Description of Service.</span>
        <span>The <span className={classes.term}>"Service"</span> includes (a) the Site, (b) Company's cloud platform for running development code, and (c) all software (including the Software, as defined below), data, documentation, reports, text, images, sounds, video, and content made available through any of the foregoing (collectively referred to as the <span className={classes.term}>"Content"</span>). Any new features added to or augmenting the Service are also subject to this TOS. For more information regarding our Service offerings, please see our product pages at <a href='https://conjure.sh'>https://conjure.sh</a>.</span>
      </p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>3.</span>
        <span className={classes.label}>License and Restrictions; Licensee and User Obligations with Regard to Use of the Service.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(a)</span>
        <span className={classes.label}>License.</span>
        <span>Any software that may be made available by Company in connection with the Service (<span className={classes.term}>"Software"</span>) contains proprietary and confidential information that is protected by applicable intellectual property and other laws. Subject to all the terms of these TOS and payment of all fees described in an Order, during the Term (as defined below) Company grants Licensee and each User a non-sublicensable, non-exclusive, non-transferable license to use the object code of any Software and Content solely in connection with the Service and any terms and procedures Company may prescribe from time to time.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(b)</span>
        <span className={classes.label}>Restrictions.</span>
        <span>Subject to these TOS, Licensee and Users may access and use the Service and Content only for lawful purposes. All rights, title and interest in and to the Service and its components, Content and all related intellectual property rights will remain with and belong exclusively to Company. Licensee shall maintain the copyright notice and any other notices that appear on the Service on any copies and any media. Neither Licensee nor any User shall (or allow any third party to) (i) modify, reverse engineer or attempt to hack or otherwise discover any source code or underlying ideas or algorithms of the Service (except to the extent that applicable law prohibits reverse engineering restrictions), (ii) sell, resell, license, sublicense, provide, lease, lend, use for timesharing or service bureau purposes or otherwise use or allow others to use the Service or Content for the benefit of any third party, (iii) use the Service or Content, or allow the transfer, transmission, export, or re-export of the Service or Content or portion thereof, in violation of any export control laws or regulations administered by the U.S. Commerce Department, OFAC, or any other government agency, (iv) use the Service to store or transmit infringing, libelous, or otherwise unlawful or tortious material, or to store or transmit material in violation of third-party privacy or intellectual property rights, (v) use the Service to store or transmit Malicious Code (as defined below), (vi) interfere with or disrupt the integrity or performance of the Service or its components, (vii) attempt to gain unauthorized access to the Service or its related systems or networks, (viii) permit direct or indirect access to or use of any Service or Content in a way that circumvents a contractual usage limit, (ix) copy the Service or any part, feature, function or user interface thereof, access the Service in order to build a competitive product or service or (x) use the Service for any purpose other than as expressly licensed herein. <span className={classes.term}>"Malicious Code"</span> means code, files, scripts, agents or programs intended to do harm, including, for example, viruses, worms, time bombs and Trojan horses.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(c)</span>
        <span className={classes.label}>Licensee Obligations with Regard to Use of the Service.</span>
        <span>Any User of the Service must be thirteen (13) years old or older to use the Service. Licensee shall (i) be responsible for Users' compliance with these TOS, (ii) be responsible for the quality and legality of Licensee Content (as defined below) and the means by which Licensee acquired Licensee Content, (iii) use commercially reasonable efforts to prevent unauthorized access to or use of the Service, and notify Company promptly of any such unauthorized access or use, (iv) use the Service only in accordance with the Company's Service documentation and applicable laws and government regulations, (v) comply with terms of service of Non-Company Applications (as defined below) with which Licensee uses the Service. Licensee and Users are responsible for maintaining the security of User's accounts and passwords. Company cannot and shall not be liable for any loss or damage from Licensee's or any User's failure to comply with this security obligation.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(d)</span>
        <span className={classes.label}>Enforcement.</span>
        <span>Licensee shall ensure that all Users comply with the terms and conditions of these TOS, including, without limitation, with Licensee's obligations set forth in Sections 3(b) and 3(c). Licensee shall promptly notify Company of any suspected or alleged violation of these TOS and shall cooperate with Company with respect to: (i) investigation by Company of any suspected or alleged violation of these TOS and (ii) any action by Company to enforce these TOS. Company may, in its sole discretion, suspend or terminate any User's access to the Service with or without written notice (including, but not limited to e-mail) to Licensee in the event that Company reasonably determines that a User has violated these TOS. Licensee shall be liable for any violation of these TOS by any User.</span>
      </p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>4.</span>
        <span className={classes.label}>Provision of the Service; Support.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(a)</span>
        <span>As part of the registration process, each User shall generate a Conjure account (<span className={classes.term}>"Account"</span>) either manually (by supplying a username and password) or through a Non-Company Application (e.g., GitHub via OAuth). Each User is responsible for maintaining the confidentiality of any login criteria, passowrd, and Account, and for all activities that occur under any such logins or the Account. Company reserves the right to access Licensee's and any User's Account in order to respond to Licensee's and/or Users' requests for technical support. Company has the right, but not the obligation, to monitor the Service, Content, or Licensee Content. Licensee further agrees that Company may may remove or disable any Content at any time for any reason (including, but not limited to, upon receipt of claims or allegations from third parties or authorities relating to such Content), or for no reason at all.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(b)</span>
        <span>Company will (a) make the Service available to Licensee and its Users pursuant to these TOS and the applicable Order, (b) use commercially reasonable efforts to make the Service available 24 hours a day, 7 days a week, except for: (i) planned downtime (of which Company shall give at least eight (8) hours notice via email or on the Site), and (ii) any unavailability caused by circumstances beyond Company's reasonable control, including, for example, an act of God, act of government, flood, fire, earthquake, civil unrest, act of terror, strike or other labor problem (other than one involving Company's employees), Internet service provider failure or delay, Non-Company Appplication, or denial of service attack.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(c)</span>
        <span>Licensee understands that the operation of the Service, including Licensee Content, may be unencrypted and involve (i) transmissions over various networks; (ii) changes to conform and adapt to technical requirements of connecting networks or devices and (iii) transmission to Company's third party vendors and hosting partners solely to provide the necessary hardware, software, networking, storage, and related technology required to operate and maintain the Service. Accordingly, Licensee acknowledges that Licensee bears sole responsibility for adequate backup of Licensee Content. Company will have no liability to Licensee for any unauthorized access or use of any of Licensee Content, or any corruption, deletion, destruction or loss of any of Licensee Content.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(d)</span>
        <span>Licensee and its Users may enable or log in to the Service via various Non-Company Applications, such as GitHub. Company may ask Users to authenticate, register for or log into Non-Company Applications on the websites or within the services of their respective providers. As part of such integration, the Non-Company Applications will provide Company with access to certain information that User has provided to such Non-Company Applications, and Company will use, store and disclose such information in accordance with Company's Privacy Policy, located at <a href='https://conjure.sh/privacy'>https://conjure.sh/privacy</a>. The manner in which Non-Company Applications use, store and disclose Licensee and User information is governed solely by the policies of the third parties operating the Non-Company Applications, and Company shall have no liability or responsibility for the privacy practices or other actions of any third party site or service that may be enabled within the Service. In addition, Company is not responsible for the accuracy, availability or reliability of any information, content, goods, data, opinions, advice or statements made available in connection with Non-Company Applications. As such, Company shall not be liable for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such Non-Company Applications. Company enables these features merely as a convenience and the integration or inclusion of such features does not imply an endorsement or recommendation.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(e)</span>
        <span>Licensee shall be responsible for obtaining and maintaining any equipment and ancillary services needed to connect to, access or otherwise use the Service, including, without limitation, modems, hardware, server, software, operating system, networking, web servers, long distance and local telephone service (collectively, <span className={classes.term}>"Equipment"</span>). Licensee shall be responsible for ensuring that such Equipment is compatible with the Service (and, to the extent applicable, the Software) and complies with all configurations and specifications set forth in Company's published policies then in effect. Licensee shall also be responsible for maintaining the security of the Equipment, Licensee's Account, all passwords (including but not limited to administrative and User passwords) and files, and for all uses of Licensee Account or the Equipment with or without Licensee's knowledge or consent.</span>
      </p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>5.</span>
        <span className={classes.label}>Fees and Payment.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(a)</span>
        <span>Licensee shall pay Company the fees set forth in an Order in accordance with the terms set forth therein; provided that Company may change any applicable fees upon thirty (30) days' notice at any time and such new fees shall become effective for any subsequent renewal Term. All payments shall be made in U.S. dollars. Any payments more than thirty (30) days overdue will bear a late payment fee of one and one-half percent (1.5%) per month, or, if lower, the maximum rate allowed by law. In addition, Licensee will pay all taxes, shipping, duties, withholdings and the like, as well as all pre-approved out of pocket expenses incurred by Company in connection with any consulting and/or support services, promptly upon invoice. If Licensee is paying any fees by credit card, Licensee shall provide Company complete and accurate information regarding the applicable credit card. Licensee represents and warrants that all such information is correct and that Licensee is authorized to use such credit card. Licensee will promptly update its account information with any changes (for example, a change in billing address or credit card expiration date) that may occur. Licensee hereby authorizes Company to bill such credit card in advance on a periodic basis in accordance with the terms of these TOS and an Order, and Licensee further agrees to pay any charges so incurred. Licensee will maintain, and Company will be entitled to audit, any records relevant to Licensee's use of the Service hereunder. Company may audit such records on reasonable notice at Company's cost (or if the audits reveal material non-compliance with these TOS, at Licensee’s cost).</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(b)</span>
        <span>For any upgrade in a subscription level for a month-to-month service plan, Company shall automatically charge Licensee the new subscription fee, effective as of the date the service upgrade is requested and for each subsequent one-month recurring cycle pursuant to the billing method applicable to Licensee. If Company is providing Licensee the Service pursuant to a yearly service plan, Company will immediately charge Licensee any increase in subscription level plan cost pursuant to the billing method applicable to Licensee, prorated for the remaining Term of Licensee's yearly billing cycle; provided, however, any decrease in a subscription level plan cost shall only take effect upon the renewal date of the then current yearly service plan. Licensee's downgrading its subscription level may cause the loss of features or capacity of Licensee's Account. Company does not accept any liability for such loss.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(c)</span>
        <span>If any amount owing by Licensee under these TOS for the Service is thirty (30) or more days overdue (or ten (10) or more days overdue in the case of amounts Licensee has authorized Company to charge to Licensee's credit card), Company may, in its sole discretion and without limiting its other rights and remedies, suspend Licensee's and any User's access to the Service and/or otherwise limit the functionality of the Service until such amounts are paid in full.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(d)</span>
        <span>Licensee agrees that its purchases are not contingent on the delivery of any future functionality or features, or dependent on any oral or written public comments made by Company regarding future functionality or features.</span>
      </p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>6.</span>
        <span className={classes.label}>Term; Expiration and Termination.</span>
        <span>These TOS shall continue in effect for the term and any renewal term as specified in an Order (collectively, the <span className={classes.term}>"Term"</span>). If either party materially breaches these TOS, the other party shall have the right to terminate the applicable Order and in the case where no Order exists, these TOS (and, in each case, all licenses granted herein) upon thirty (30) days (ten (10) days in the case of non-payment and immediately in the case of a breach of <span className={classes.reference}>Sections 3(b)</span>) written notice of any such breach, unless such breach is cured during such notice period. In the case of a free trial or Company otherwise providing the Service at no cost to a Licensee, Company shall have, upon Licensee or any Users failing to use the Service for more than six (6) consecutive months, the right, in its sole discretion, to terminate all User Accounts of Licensee and terminate Licensee's and all Licensee's Users' access to and use of the Service without notice. Upon expiration or termination of an Order or these TOS, Licensee shall immediately be unable access and use the Service, all Licensee Content may be deleted from the Service at Company's sole discretion (such information can not be recovered once Licensee's Account or any User Account is terminated) and Licensee shall return or destroy all copies of all Content and all portions thereof in Licensee's possession and so certify to Company, if such certification is requested by Company. <span className={classes.reference}>Sections 3(b)</span> and <span className={classes.reference}>5 through 13</span> of these TOS, shall survive termination or expiration of these TOS. Termination is not an exclusive remedy and all other remedies shall be available whether or not termination occurs.</span>
      </p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>7.</span>
        <span className={classes.label}>Indemnification.</span>
        <span>Licensee and each User shall defend, indemnify and hold harmless Company from all damages, settlements, attorneys' fees and expenses related to any third-party claim, suite or demand (i) arising from Licensee or any User's use of the Service or Content in breach of these TOS or in violation of applicable law, or (ii) alleging that the Licensee Content infringes or misappropriates such third party's intellectual property rights or violates applicable law; provided Licensee is promptly notified of any and all threats, suits, claims and proceedings related thereto and given reasonable assistance by Company (at Licensee's cost). Company reserves the right to assume the exclusive defense and control of any matter that is subject to indemnification under this <span className={classes.reference}>Section 7</span>. In such case, Licensee and Users agree to cooperate with any reasonable requests in assisting Company's defense of such matter.</span>
      </p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>8.</span>
        <span className={classnames(classes.label, classes.loud)}>Disclaimer of Warranties.</span>
        <span className={classes.loud}>The Service may be temporarily unavailable for scheduled maintenance or for unscheduled emergency maintenance, either by Company or by third-party providers, or because of other causes beyond Company's reasonable control, but Company shall use reasnoable efforts to provide advance notice in writing or by email of any scheduled Service disruption. However, the Service, including the Site and Content, and all server and network components are provided on an "as is" and "as available" basis without any warranties of any kind, and Company expressly disclaims any and all warranties, whether express or implied, including, but not limited to, implied warranties of merchantability, title, fitness for a particular purpose, and noninfringement. Licensee and Users acknowledge that Company does not warrent that the Service will be uninterrupted, timely, secure, error-free or virus-free, nor does Company make any warranty as to the results that may be obtained from use of the Service, and no information, advice or services obtained by Licensee or Users from Company or through the Service shall create any warranty not expressly stated in these TOS.</span>
      </p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>9.</span>
        <span className={classnames(classes.label, classes.loud)}>Limitation of Liability.</span>
        <span className={classes.loud}>Under no circumstances and under no legal theory (whether in contract, tort or otherwise) shall Company be liable to Licensee, any User or any third-party for (a) any indirect, incidental, special, exemplary, consequential or punitive damages. Including lost profits, lost sales or business, lost data, goodwill, or other intangible losses or (b) for any direct damages, cost, losses or liabilities in excess of the fees actually paid by Licensee in the six (6) months preceding the event giving rise to Licensee's or User's claim or, if no fees apply, one hundred dollars (US$100). The provisions of this section allocate the risk under these TOS between the parties and parties have relied on tehse limitations in determining wheter to enter into these TOS. Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply to Licensee or some Users. In the states, Company's liability will be limited to the greatest extent permitted by law.</span>
      </p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>10.</span>
        <span className={classes.label}>Proprietary Rights; Limited License to Company; Feedback.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(a)</span>
        <span className={classes.label}>Reservation of Rights.</span>
        <span>Subject to the limited rights expressly granted hereunder, Company and its licensors reserve all of Company's and its licensors right, title and interest in and to the Service, including all of Company's and its licensors related intellectual property rights. No rights are granted to Licensee hereunder other than as expressly set forth herein.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(b)</span>
        <span className={classes.label}>License to Company by Licensee to Host Licensee Content.</span>
        <span>Licensee hereby grants Company a worldwide, non-exclusive, royalty-free, fully paid, sublicensable, limited-term license to host, copy, transmit and display Licensee Content that Licensee or any User posts to the Service, solely as necessary for Company to provide the Service in accordance with these TOS. Subject to the limited licenses granted herein, Company acquires no right, title or interest from Licensee or Licensee's licensors under these TOS in or to Licensee Content.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(c)</span>
        <span className={classes.label}>License by Licensee to Use Feedback.</span>
        <span>Licensee hereby grants to Company a worldwide, perpetual, irrevocable, royalty-free license to use and incorporate into the Service any suggestion, enhancement request, recommendation, correction or other feedback provided by Licensee or Users relating to the operation of the Service.</span>
      </p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>11.</span>
        <span className={classes.label}>Confidentiality.</span>
        <span>Any technical, financial, business or other information provided by one party (the <span className={classes.term}>"Disclosing Party"</span>) to the other party (the <span className={classes.term}>"Receiving Party"</span>) and designated as confidential or proprietary or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure (<span className={classes.term}>"Confidential Information"</span>) shall be held in confidence and not disclosed and shall not be used except to the extent necessary to carry out the Receiving Party's obligations or express rights hereunder, except as otherwise authorized by the Disclosing Party in writing. For clarity, the Service and Content shall be deemed Confidential Information of Company whether or not otherwise designated as such. The Receiving Party shall use the same degree of care that it uses to protect the confidentiality of its own confidential information of like kind (but not less than reasonable care). These obligations will not apply to information that (i) was previously known by the Receiving Party, as demonstrated by documents or files in existence at the time of disclosure, (ii) is generally and freely publicly available through no fault of the Receiving Party, (iii) the Receiving Party otherwise rightfully obtains from third parties without restriction, or (iv) is independently developed by the Receiving Party without reference to or reliance on the Disclosing Party's Confidential Information, as demonstrated by documents or files in existence at the time of disclosure. The Receiving Party may disclose Confidential Information of the Disclosing Party to the extent compelled by law to do so, provided the Receiving Party gives the Disclosing Party prior notice of the compelled disclosure (to the extent legally permitted) and reasonable assistance, at the Disclosing Party's cost, if the Disclosing Party wishes to contest the disclosure. If the Receiving Party is compelled by law to disclose the Disclosing Party's Confidential Information as part of a civil proceeding to which the Disclosing Party is a party, and the Disclosing Party is not contesting the disclosure, the Disclosing Party will reimburse the Receiving Party for its reasonable cost of compiling and providing secure access to that Confidential Information. In the event that such protective order or other remedy is not obtained, the Receiving Party shall furnish only that portion of the Confidential Information that is legally required and use commercially reasonable efforts to obtain assurance that confidential treatment will be accorded the Confidential Information.</span>
      </p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>12.</span>
        <span className={classes.label}>Protection of Confidential Licensee Content; Security.</span>
        <span>Company shall maintain administrative, physical, and technical safeguards for protection of the security, confidentiality and integrity of Licensee Content that is Licensee's Confidential Information (<span className={classes.term}>"Confidential Licensee Content"</span>). Those safeguards shall include, but will not be limited to, measures for preventing access, use, modification or disclosure of Confidential Licensee Content by Company's personnel except (a) to provide the Service and prevent or address service or technical problems, (b) as compelled by law in accordance with <span className={classes.reference}>Section 11 (Confidentiality)</span> above, or (c) as Licensee expressly permits in writing.</span>
      </p>
    </div>

    <div className={classes.section}>
      <p>
        <span className={classes.part}>13.</span>
        <span className={classes.label}>DMCA Copyright Policy.</span>
        <span>The Digital Millennium Copyright Act of 1998 (the <span className={classes.term}>"DMCA"</span>) provides recourse for copyright owners who believe that material appearing on the Internet infringes their rights under U.S. copyright law.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(a)</span>
        <span className={classes.label}>Reporting Instances of Copyright Infringement.</span>
        <span>Company will promptly process and investigate notices of alleged infringement and will take appropriate actions under the DMCA and other applicable intellectual property laws with respect to any alleged or actual infringement. A notification of claimed copyright infringement should be emailed to Company's Copyright Agent at info@conjure.sh (subject line: "DMCA Takedown Request"). To be effective, the notification must be in writing and contain the following information: (i) an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright or other intellectual property interest; (ii) a description of the copyrighted work or other intellectual property that you claim has been infringed; (iii) a description of where the material that you claim is infringing is located on the Site, with enough detail that we may find it on the Site; (iv) your address, telephone number, and email address; (v) a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright or intellectual property owner, its agent, or the law; (vi) a statement by you, made under penalty of perjury, that the above information in your Notice is accurate and that you are the copyright or intellectual property owner or authorized to act on the copyright or intellectual property owner's behalf. You may also contact us by mail at:</span>
        <span className={classes.list}>
          <span>Attention: Conjure Copyright Agent</span>
          <span>Conjure</span>
          <span>1045 Lake St, Apt 4</span>
          <span>San Francisco, CA, 94118</span>
          <span>United States</span>
        </span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(b)</span>
        <span className={classes.label}>Submitting a DMCA Counter-Notification.</span>
        <span>If you believe that the relevant Content that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use such Content, you may send a written counter-notice containing the following information to the Copyright Agent: (i) your physical or electronic signature; (ii) identification of the content that has been removed or to which access has been disabled and the location at which the content appeared before it was removed or disabled; (iii) a statement that you have a good faith belief that the content was removed or disabled as a result of mistake or a misidentification of the content; and (iv) your name, address, telephone number, and e-mail address, a statement that you consent to the jurisdiction of the federal court located within the Northern District of California and a statement that you will accept service of process from the person who provided notification of the alleged infringement. If a counter-notice is received by the Copyright Agent, Company will send a copy of the counter-notice to the original complaining party informing that person that it may replace the removed content or cease disabling it in 10 business days. Unless the copyright owner files an action seeking a court order against the content provider, member or user, the removed content may be replaced, or access to it restored, in 10 to 14 business days or more after receipt of the counter-notice, at Company's sole discretion.</span>
      </p>
      <p className={classes.subSection}>
        <span className={classes.part}>(c)</span>
        <span className={classes.label}>Repeat Infringer Policy.</span>
        <span>In accordance with the DMCA and other applicable law, Company has adopted a policy of terminating, in appropriate circumstances and at Company's sole discretion, access to the Service for Users who are deemed to be repeat infringers. Company may also at its sole discretion limit access to the Site and/or terminate the access of Users who infringe any intellectual property rights of others, whether or not there is any repeat infringement.</span>
      </p>
    </div>

    {styles}
  </Layout>
);
