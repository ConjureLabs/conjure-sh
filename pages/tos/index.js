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
          <span>Conjure Labs, Inc. (<span className={classes.term}>"Company"</span> or <span className={classes.term}>"we"</span>) provides its Services (as defined below) to you through its web site located at https://conjure.sh (the <span className={classes.term}>"Site"</span>), pursuant to these TOS. By entering into a Service order form, or other ordering document, web-based or email-based ordering mechanism or registration process (each an <span className={classes.term}>"Order"</span>) or otherwise downloading, accessing or using the Service, Licensee unconditionally accepts and agrees to all of the terms of these TOS. Licensee represents that it has the authority to bind itself and its affiliates to the terms of these TOS, and, accordingly, the term "Licensee" shall refer to such entity. If Licensee is an individual using the Service, the terms "Licensee" and "User" shall each apply to such individual using the Service for the purposes of these TOS. Capitalized terms not defined herein shall be given the meaning set forth in the applicable Order. These TOS shall apply to all use by Licensee and Users (as defined below) of the Service. <span className={classes.term}>"User"</span> means an individual who is authorized by Licensee to use the Service, for whom Licensee (or Company at Licensee's request) has supplied a user identification and password either manually or using a Non-Company Application (as defined below) (e.g., GitHub via oAuth). Users may include, for example, Licensee's employees, consultants, contractors and agents, and third parties that Licensee transacts business. Company may change these TOS from time to time by providing Licensee and Users at least thirty (30) days notice either by emailing the email address associated with License's or User's account or by posting a notice on the Service. The revised TOS shall become effective thirty (30) days after Company posts the updated TOS on the Service or e-mails Licensee and/or Users notice of a change to these TOS. If any change to these TOS is not acceptable to a Licensee or a User, such User shall stop using the Service or, in the case of Licensee, shall send a cancellation e-mail to info@conjure.sh.</span>
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
          <span className={classes.label}>Restrictions.</span>
          <span>Subject to these TOS, Licensee and Users may access and use the Service and Content only for lawful purposes. All rights, title and interest in and to the Service and its components, Content and all related intellectual property rights will remain with and belong exclusively to Company. Licensee shall maintain the copyright notice and any other notices that appear on the Service on any copies and any media. Neither Licensee nor any User shall (or allow any third party to) (i) modify, reverse engineer or attempt to hack or otherwise discover any source code or underlying ideas or algorithms of the Service (except to the extent that applicable law prohibits reverse engineering restrictions), (ii) sell, resell, license, sublicense, provide, lease, lend, use for timesharing or service bureau purposes or otherwise use or allow others to use the Service or Content for the benefit of any third party, (iii) use the Service or Content, or allow the transfer, transmission, export, or re-export of the Service or Content or portion thereof, in violation of any export control laws or regulations administered by the U.S. Commerce Department, OFAC, or any other government agency, (iv) use the Service to store or transmit infringing, libelous, or otherwise unlawful or tortious material, or to store or transmit material in violation of third-party privacy or intellectual property rights, (v) use the Service to store or transmit Malicious Code (as defined below), (vi) interfere with or disrupt the integrity or performance of the Service or its components, (vii) attempt to gain unauthorized access to the Service or its related systems or networks, (viii) permit direct or indirect access to or use of any Service or Content in a way that circumvents a contractual usage limit, (ix) copy the Service or any part, feature, function or user interface thereof, access the Service in order to build a competitive product or service or (x) use the Service for any purpose other than as expressly licensed herein. <span className={classes.term}>"Malicious Code"</span> means code, files, scripts, agents or programs intended to do harm, including, for example, viruses, worms, time bombs and Trojan horses.</span>
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
      <a href='/tos'>Terms</a>
    </footer>

    {styles}
  </div>
);
