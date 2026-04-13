export const IMG = {
  singapore: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1e226a98a-3d48-4cd9-a261-e2c515240501.png',
  australia: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1407c1d01-0fe5-4305-8290-55ea36062e8b.png',
  serbia: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1a4d74935-a868-49d3-838d-73b1d18bfe84.png',
  moldova: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/183ff4d9d-8365-442d-9f7a-de92d43be916.png',
  kuwait: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/170442829-3643-4d17-9e28-93878c4a5d21.png',
  cambodia: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1215156d0-ec37-4db9-94dc-535c541efc85.png',
  russia: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1b958e265-a0b7-441a-8142-046e20b6db4d.png',
  saudiarabia: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1120c4a36-6d91-462a-8710-c4120f6637c3.png',
  belarus: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1b296953f-dabb-40b6-8204-0bc692b2d2fc.png',
  malaysia: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1ad75cf6c-e29d-4314-929c-3e5f29cfcb8a.png',
  team: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/12f790113-5d41-4344-a934-ba661dd20e65.png',
  traveler: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1c1c9765a-67c0-4d7d-9e3c-9125f60102b1.png',
  dashboard: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1b39dd3e6-0972-49ff-b00c-d277bf119e8f.png',
  jobboard: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/1fff525fc-cc2c-4ffc-92d4-612e7dee3bcf.png',
  globevisa: 'https://image.qwenlm.ai/public_source/a7b586f8-7250-4f86-bc01-7c26cadd0134/10f608b8c-1d1b-42c7-a4b4-d9654794c134.png',
};

export interface CountryData {
  slug: string;
  img: string;
  country: string;
  flag: string;
  visa: string;
  badge?: string;
  desc: string;
  featured?: boolean;
  region: 'Asia' | 'Europe' | 'Middle East';
  capital: string;
  currency: string;
  language: string;
  visaTypes: { name: string; processingTime: string; fee: string; validity: string }[];
  requirements: string[];
  industries: string[];
  overview: string;
}

export const countries: CountryData[] = [
  {
    slug: 'singapore', img: IMG.singapore, country: 'Singapore', flag: '🇸🇬',
    visa: 'Work Permit / IPA', badge: 'Top Destination',
    desc: 'Work Permit and In-Principle Approval support for skilled & semi-skilled workers entering Singapore\'s thriving economy.',
    featured: true, region: 'Asia', capital: 'Singapore', currency: 'SGD', language: 'English, Malay, Mandarin, Tamil',
    visaTypes: [
      { name: 'Work Permit (WP)', processingTime: '1-3 weeks', fee: 'SGD 35', validity: 'Up to 2 years' },
      { name: 'S Pass', processingTime: '3-8 weeks', fee: 'SGD 60', validity: 'Up to 2 years' },
      { name: 'Employment Pass (EP)', processingTime: '3-8 weeks', fee: 'SGD 105', validity: 'Up to 2 years' },
      { name: 'In-Principle Approval (IPA)', processingTime: '1-4 weeks', fee: 'Included with WP', validity: '6 months' },
    ],
    requirements: ['Valid passport (min 6 months)', 'Medical examination report', 'Educational certificates', 'Employment contract from Singapore employer', 'Passport-sized photographs', 'Security bond (if applicable)', 'Company registration documents'],
    industries: ['Construction', 'Manufacturing', 'Marine', 'Healthcare', 'IT & Technology', 'Hospitality'],
    overview: 'Singapore remains one of the most attractive destinations for foreign workers in Southeast Asia. With a transparent work permit system, strong legal protections for workers, and one of the highest standards of living in the region, it offers excellent career opportunities across multiple sectors. VisaHOBe provides complete end-to-end support for Singapore work permits, from initial employer matching to IPA approval and deployment.',
  },
  {
    slug: 'australia', img: IMG.australia, country: 'Australia', flag: '🇦🇺',
    visa: 'Visitor / Business / Skilled', badge: 'High Value',
    desc: 'Complete visa pathways including Visitor, Business, and Skilled migration routes to Australia.',
    featured: true, region: 'Middle East', capital: 'Canberra', currency: 'AUD', language: 'English',
    visaTypes: [
      { name: 'Subclass 482 (TSS)', processingTime: '1-4 months', fee: 'AUD 1,330-2,645', validity: 'Up to 4 years' },
      { name: 'Subclass 494 (Skilled Regional)', processingTime: '6-12 months', fee: 'AUD 4,115', validity: '5 years' },
      { name: 'Subclass 600 (Visitor)', processingTime: '2-4 weeks', fee: 'AUD 190', validity: '3-12 months' },
      { name: 'Subclass 189 (Skilled Independent)', processingTime: '6-18 months', fee: 'AUD 4,240', validity: 'Permanent' },
    ],
    requirements: ['Valid passport', 'Skills assessment from relevant authority', 'English language test (IELTS/PTE)', 'Health examination', 'Police clearance certificate', 'Qualification recognition (VETASSESS/ACS)', 'Proof of work experience', 'Sponsorship from Australian employer (for 482)'],
    industries: ['Healthcare & Nursing', 'IT & Software', 'Engineering', 'Construction', 'Agriculture', 'Hospitality & Tourism'],
    overview: 'Australia offers some of the most robust skilled migration pathways in the world. Whether you\'re seeking employer-sponsored visas, skilled independent migration, or business visitor options, the Australian immigration system provides clear routes for qualified professionals. VisaHOBe assists with skills assessments, documentation, and application lodgement across all major visa subclasses.',
  },
  {
    slug: 'serbia', img: IMG.serbia, country: 'Serbia', flag: '🇷🇸',
    visa: 'Work Permit', badge: 'European Gateway',
    desc: 'Work permit support for Serbia — an emerging European gateway for international professionals.',
    featured: true, region: 'Europe', capital: 'Belgrade', currency: 'RSD', language: 'Serbian',
    visaTypes: [
      { name: 'Work Permit (Type A)', processingTime: '2-4 weeks', fee: 'EUR 100-200', validity: '1 year (renewable)' },
      { name: 'Temporary Residence + Work', processingTime: '4-6 weeks', fee: 'EUR 150-300', validity: '1 year' },
      { name: 'Business Visa (C type)', processingTime: '1-2 weeks', fee: 'EUR 60', validity: '90 days' },
    ],
    requirements: ['Valid passport (min 6 months)', 'Employment contract from Serbian employer', 'Medical certificate', 'Criminal record certificate', 'Proof of accommodation in Serbia', 'Educational qualifications (apostilled)', 'Passport photos'],
    industries: ['Construction', 'Manufacturing', 'Agriculture', 'IT & Technology', 'Automotive', 'Tourism'],
    overview: 'Serbia is rapidly emerging as a key European gateway for international workers. With a growing economy, competitive labor costs, and a strategic location bridging Eastern and Western Europe, Serbia offers significant opportunities for skilled professionals. The Serbian work permit process is relatively straightforward, and VisaHOBe provides full support from employer coordination to document preparation.',
  },
  {
    slug: 'moldova', img: IMG.moldova, country: 'Moldova', flag: '🇲🇩',
    visa: 'Recruitment Pipeline', badge: 'New Route',
    desc: 'Structured recruitment pipeline for Moldova, connecting candidates with verified employer demand.',
    region: 'Europe', capital: 'Chișinău', currency: 'MDL', language: 'Romanian',
    visaTypes: [
      { name: 'Work Permit', processingTime: '2-4 weeks', fee: 'EUR 80-150', validity: '1 year (renewable)' },
      { name: 'Temporary Residence Permit', processingTime: '4-8 weeks', fee: 'EUR 100-200', validity: '1 year' },
    ],
    requirements: ['Valid passport', 'Job offer from Moldovan employer', 'Medical certificate', 'Criminal background check', 'Proof of qualifications', 'Passport photographs', 'Travel insurance'],
    industries: ['Agriculture', 'Construction', 'Manufacturing', 'IT & Services', 'Food Processing'],
    overview: 'Moldova is an emerging destination in VisaHOBe\'s European recruitment pipeline. With growing demand for skilled workers across agriculture, construction, and manufacturing, Moldova offers new opportunities for international professionals. Our structured pipeline connects pre-screened candidates with verified employer demand, ensuring smooth placements and transparent processing.',
  },
  {
    slug: 'kuwait', img: IMG.kuwait, country: 'Kuwait', flag: '🇰🇼',
    visa: 'Employer Demand Route',
    desc: 'Kuwait employer demand route — fast-track processing for confirmed job placements.',
    region: 'Middle East', capital: 'Kuwait City', currency: 'KWD', language: 'Arabic, English',
    visaTypes: [
      { name: 'Work Visa (Visa 18)', processingTime: '2-6 weeks', fee: 'KWD 10-50', validity: '2 years (renewable)' },
      { name: 'Project Visa', processingTime: '2-4 weeks', fee: 'KWD 10-30', validity: 'Project duration' },
      { name: 'Business Visit Visa', processingTime: '1-2 weeks', fee: 'KWD 5-15', validity: '1-3 months' },
    ],
    requirements: ['Valid passport (min 6 months)', 'Medical fitness certificate', 'Attested educational certificates', 'Employment contract', 'NOC from current employer (if applicable)', 'Police clearance certificate', 'Passport photographs'],
    industries: ['Oil & Gas', 'Construction', 'Healthcare', 'Engineering', 'Domestic Workers', 'Hospitality'],
    overview: 'Kuwait\'s oil-rich economy continues to drive demand for international workers across multiple sectors. The employer demand route provides fast-track processing for candidates with confirmed job placements. VisaHOBe coordinates directly with Kuwaiti employers to ensure all documentation meets Ministry of Interior requirements, streamlining the visa approval process.',
  },
  {
    slug: 'cambodia', img: IMG.cambodia, country: 'Cambodia', flag: '🇰🇭',
    visa: 'Business Setup + Work', badge: 'Fast Track',
    desc: 'Business setup assistance combined with work route processing for Cambodia.',
    region: 'Asia', capital: 'Phnom Penh', currency: 'KHR/USD', language: 'Khmer, English',
    visaTypes: [
      { name: 'Ordinary Visa (E class)', processingTime: '1-3 days', fee: 'USD 35-45', validity: '30 days (extendable)' },
      { name: 'Work Permit', processingTime: '2-4 weeks', fee: 'USD 100-300', validity: '1 year' },
      { name: 'Business Visa Extension', processingTime: '1-2 weeks', fee: 'USD 285-300', validity: '6-12 months' },
    ],
    requirements: ['Valid passport (min 6 months)', 'Passport photographs', 'Employment letter', 'Medical check', 'Company registration documents', 'Work permit application form'],
    industries: ['Garment Manufacturing', 'Construction', 'Tourism & Hospitality', 'Agriculture', 'Technology', 'Real Estate'],
    overview: 'Cambodia is one of Southeast Asia\'s fastest-growing economies with an increasingly business-friendly environment. The country offers streamlined visa processes, especially for business setup and work permits. VisaHOBe provides complete support for both business establishment and work visa processing, making Cambodia an accessible destination for international professionals.',
  },
  {
    slug: 'russia', img: IMG.russia, country: 'Russia', flag: '🇷🇺',
    visa: 'Work Permit',
    desc: 'Work permit processing for Russia, covering multiple industry sectors and employment types.',
    region: 'Europe', capital: 'Moscow', currency: 'RUB', language: 'Russian',
    visaTypes: [
      { name: 'Work Visa', processingTime: '4-8 weeks', fee: 'USD 150-250', validity: 'Up to 3 years' },
      { name: 'Highly Qualified Specialist (HQS)', processingTime: '2-4 weeks', fee: 'USD 200-400', validity: 'Up to 3 years' },
      { name: 'Business Visa', processingTime: '1-3 weeks', fee: 'USD 160', validity: '90 days' },
    ],
    requirements: ['Valid passport (min 18 months)', 'HIV test certificate', 'Medical examination', 'Educational certificates (translated & notarized)', 'Work permit from employer', 'Migration card', 'Registration at place of stay'],
    industries: ['Oil & Gas', 'Construction', 'Mining', 'IT & Technology', 'Agriculture', 'Manufacturing'],
    overview: 'Russia remains a significant market for international workers, particularly in oil & gas, construction, and IT sectors. The work permit system includes categories for general workers and highly qualified specialists (HQS) with simplified processing. VisaHOBe handles the complex documentation requirements including translation, notarization, and coordination with Russian employers.',
  },
  {
    slug: 'saudi-arabia', img: IMG.saudiarabia, country: 'Saudi Arabia', flag: '🇸🇦',
    visa: 'Work Visa',
    desc: 'Saudi Arabia work visa services for construction, healthcare, and technology sectors.',
    region: 'Middle East', capital: 'Riyadh', currency: 'SAR', language: 'Arabic',
    visaTypes: [
      { name: 'Work Visa (Iqama)', processingTime: '2-6 weeks', fee: 'SAR 500-2,000', validity: '1-2 years (renewable)' },
      { name: 'Business Visit Visa', processingTime: '1-2 weeks', fee: 'SAR 300-500', validity: '90 days' },
      { name: 'Temporary Work Visa', processingTime: '1-3 weeks', fee: 'SAR 300-800', validity: '3-6 months' },
    ],
    requirements: ['Valid passport (min 6 months)', 'Medical fitness certificate', 'Attested educational certificates', 'Employment contract (Musaned)', 'Police clearance certificate', 'Passport photographs', 'Employer sponsorship (Kafala)'],
    industries: ['Construction & Infrastructure', 'Healthcare', 'Oil & Gas', 'IT & Technology', 'Hospitality', 'Education'],
    overview: 'Saudi Arabia\'s Vision 2030 is driving massive infrastructure and economic transformation, creating significant demand for international talent. The Kingdom offers competitive salaries and tax-free income across major sectors. VisaHOBe provides comprehensive support for Saudi work visas, including Musaned registration, medical processing, and employer coordination through the Kafala sponsorship system.',
  },
  {
    slug: 'belarus', img: IMG.belarus, country: 'Belarus', flag: '🇧🇾',
    visa: 'Work Permit',
    desc: 'Belarus work permit processing with employer coordination and documentation support.',
    region: 'Europe', capital: 'Minsk', currency: 'BYN', language: 'Belarusian, Russian',
    visaTypes: [
      { name: 'Work Permit', processingTime: '2-4 weeks', fee: 'USD 100-200', validity: '1 year (renewable)' },
      { name: 'Temporary Residence Permit', processingTime: '4-8 weeks', fee: 'USD 80-150', validity: '1 year' },
    ],
    requirements: ['Valid passport', 'Job offer from Belarusian employer', 'Medical certificate', 'Criminal record check', 'Educational qualifications', 'Passport photographs', 'Proof of accommodation'],
    industries: ['IT & Technology', 'Manufacturing', 'Agriculture', 'Construction', 'Petrochemicals', 'Education'],
    overview: 'Belarus offers opportunities for international workers, particularly in IT, manufacturing, and construction sectors. The country has been developing its Hi-Tech Park ecosystem and industrial base, creating demand for skilled professionals. VisaHOBe coordinates with Belarusian employers to handle work permit applications, documentation, and residence permit processing.',
  },
  {
    slug: 'malaysia', img: IMG.malaysia, country: 'Malaysia', flag: '🇲🇾',
    visa: 'Employment Pass', badge: 'ASEAN Hub',
    desc: 'Malaysia Employment Pass for skilled professionals entering the ASEAN economic hub.',
    region: 'Asia', capital: 'Kuala Lumpur', currency: 'MYR', language: 'Malay, English',
    visaTypes: [
      { name: 'Employment Pass (Category I)', processingTime: '2-4 weeks', fee: 'MYR 500-2,000', validity: 'Up to 5 years' },
      { name: 'Employment Pass (Category II)', processingTime: '2-4 weeks', fee: 'MYR 500-1,500', validity: 'Up to 2 years' },
      { name: 'Professional Visit Pass', processingTime: '1-3 weeks', fee: 'MYR 500-1,000', validity: '12 months' },
      { name: 'Temporary Employment Pass', processingTime: '1-2 weeks', fee: 'MYR 200-500', validity: '2 years' },
    ],
    requirements: ['Valid passport (min 12 months)', 'Employment contract', 'Educational qualifications', 'Curriculum vitae', 'Company registration documents', 'Passport photographs', 'Medical examination (upon arrival)'],
    industries: ['Oil & Gas', 'IT & Technology', 'Manufacturing', 'Healthcare', 'Education', 'Financial Services'],
    overview: 'Malaysia is a premier ASEAN economic hub offering excellent quality of life and competitive salaries for skilled professionals. The Employment Pass system is well-structured with clear categories based on salary levels and job types. VisaHOBe assists with EP applications through the ESD Online system, ensuring all documentation meets Immigration Department requirements for smooth approval.',
  },
];

export const getCountryBySlug = (slug: string) => countries.find(c => c.slug === slug);
