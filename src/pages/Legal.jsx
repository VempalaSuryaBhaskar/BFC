import HeroSection from '../components/sections/HeroSection';
import Section from '../components/ui/Section';
import Icon from '../components/ui/Icon';
import useDocumentMeta from '../hooks/useDocumentMeta';

/**
 * Privacy Policy and Terms — PLACEHOLDER STRUCTURE ONLY.
 * Final text must be prepared or reviewed by qualified legal counsel.
 */
const DOCS = {
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy | BFC',
    lead: 'How BFC collects, uses and protects information shared through this website.',
    sections: [
      ['Information we collect', '[Describe the information collected through the inquiry and contact forms, and any analytics or cookies used.]'],
      ['How we use information', '[Explain that information is used to understand and respond to inquiries, and for no other purpose without consent.]'],
      ['Sharing of information', '[Describe when, and with whose agreement, details may be shared with experts or partners in the BFC network.]'],
      ['Data retention and security', '[State how long information is kept and how it is protected.]'],
      ['Your rights', '[Explain how individuals can access, correct or request deletion of their information.]'],
      ['Contact', '[Provide the contact details for privacy-related questions.]'],
    ],
  },
  terms: {
    path: '/terms',
    title: 'Terms of Use',
    metaTitle: 'Terms of Use | BFC',
    lead: 'The terms that apply to the use of this website and its content.',
    sections: [
      ['Use of this website', '[Describe acceptable use of the website and its content.]'],
      ['Nature of BFC’s services', '[Clarify that BFC is an advisory and industry-connect platform, and that specialist services are provided by independent qualified professionals.]'],
      ['No guarantee of outcomes', '[State that information and introductions do not guarantee any particular project outcome.]'],
      ['Intellectual property', '[Describe ownership of BFC content, BFC Talks recordings and brand assets.]'],
      ['Third-party links', '[Explain that external links, including YouTube and social platforms, are governed by their own terms.]'],
      ['Changes to these terms', '[Describe how and when these terms may be updated.]'],
    ],
  },
};

export default function Legal({ doc = 'privacy' }) {
  const page = DOCS[doc];

  useDocumentMeta({ title: page.metaTitle, description: page.lead, path: page.path });

  return (
    <>
      <HeroSection eyebrow="Legal" title={page.title} lead={page.lead} />
      <Section tone="white" narrow aria-label={page.title}>
        <p className="placeholder-note" style={{ marginBottom: 48 }}>
          <Icon name="info" size={18} />
          This page is a placeholder outline. The final {page.title.toLowerCase()} should be prepared or reviewed by qualified legal counsel
          before the website collects personal information.
        </p>
        <div className="prose">
          {page.sections.map(([heading, text], i) => (
            <div key={heading}>
              <h2>
                {i + 1}. {heading}
              </h2>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
