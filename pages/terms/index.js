import classnames from 'classnames';

import styles, { classes } from './styles.js';

export default () => (
  <div className={classes.root}>
    <header className={classes.header}>
      <a href='/'>
        <h1 className={classes.serviceName}>Conjure</h1>
      </a>
    </header>

    <main className={classes.wrap}>
      <h2>Conjure Terms of Service</h2>

      <span className={classes.topNote}>Last updated November 18, 2017.</span>

      <div className={classes.section}>
        <p className={classes.loud}>The following terms of service (these "TOS") shall be deemed incorporated by reference into each other (as defined below) between Conjure Labs, Inc. a Delaware corporation DBA Conjure ("Conjure") and the licensee identified therein ("Licensee").</p>
      </div>

      <div className={classes.section}>
        <p>
          <span className={classes.part}>1.</span>
          <span className={classes.label}>Acceptance of Terms.</span>
          <span>Conjure Labs, Inc. (<span className={classes.term}>"Company"</span> or <span className={classes.term}>"we"</span>) provides its Services (as defined below) to you through its web site located at <a href='https://conjure.sh'>https://conjure.sh</a> (the <span className={classes.term}>"Site"</span>), pursuant to these TOS. By entering into a Service order form, or other ordering document, web-based or email-based ordering mechanism or registration process (each an <span className={classes.term}>"Order"</span>) or otherwise downloading, accessing or using the Service, Licensee unconditionally accepts and agrees to all of the terms of these TOS. Licensee represents that it has the authority to bind itself and its affiliates to the terms of these TOS, and, accordingly, the term "Licensee" shall refer to such entity. If Licensee is an individual using the Service, the terms "Licensee" and "User" shall each apply to such individual using the Service for the purposes of these TOS. Capitalized terms not defined herein shall be given the meaning set forth in the applicable Order. These TOS shall apply to all use by Licensee and Users (as defined below) of the Service. <span className={classes.term}>"User"</span> means an individual who is authorized by Licensee to use the Service, for whom Licensee (or Company at Licensee's request) has supplied a user identification and password either manually or using a Non-Company Application (as defined below) (e.g., GitHub via OAuth). Users may include, for example, Licensee's employees, consultants, contractors and agents, and third parties that Licensee transacts business. Company may change these TOS from time to time by providing Licensee and Users at least thirty (30) days notice either by emailing the email address associated with License's or User's account or by posting a notice on the Service. The revised TOS shall become effective thirty (30) days after Company posts the updated TOS on the Service or e-mails Licensee and/or Users notice of a change to these TOS. If any change to these TOS is not acceptable to a Licensee or a User, such User shall stop using the Service or, in the case of Licensee, shall send a cancellation e-mail to info@conjure.sh.</span>
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
    </main>

    <footer className={classes.footer}>
      <span>Copyright &copy; 2017 Conjure Labs, Inc.</span>
      <del>|</del>
      <a href='/about'>About</a>
      <del>|</del>
      <a href='/privacy'>Privacy</a>
      <del>|</del>
      <a href='/terms'>Terms</a>
    </footer>

    {styles}
  </div>
);
