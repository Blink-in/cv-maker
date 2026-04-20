import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ADSENSE_CLIENT = 'ca-pub-5331800347590312';
const ADSENSE_SCRIPT_ID = 'adsense-script';

const routeConfig = {
  '/': {
    title: 'CV-mave - AI-Powered CV Builder | Create Professional Resumes',
    description:
      'Create professional, job-winning CVs with AI-powered suggestions, resume scoring, ATS advice, and downloadable templates.',
    allowAds: true,
    robots: 'index,follow',
  },
  '/templates': {
    title: 'Choose a CV Template | CV-mave',
    description:
      'Browse ATS-friendly CV templates and choose a resume layout before starting the builder.',
    allowAds: false,
    robots: 'noindex,nofollow',
  },
  '/create-cv': {
    title: 'Create Your CV | CV-mave',
    description:
      'Build your CV step by step with guided sections for work history, education, skills, and projects.',
    allowAds: false,
    robots: 'noindex,nofollow',
  },
  '/preview': {
    title: 'Preview Your CV | CV-mave',
    description:
      'Preview your CV, print it, or export it as a document before applying for jobs.',
    allowAds: false,
    robots: 'noindex,nofollow',
  },
  '/analyze': {
    title: 'CV Analysis Tool | CV-mave',
    description:
      'Analyze your CV for completeness, keyword coverage, and job-readiness with actionable suggestions.',
    allowAds: false,
    robots: 'noindex,nofollow',
  },
  '/cover-letter': {
    title: 'Cover Letter Builder | CV-mave',
    description:
      'Create and improve your cover letter with guided prompts and tailored writing support.',
    allowAds: false,
    robots: 'noindex,nofollow',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | CV-mave',
    description:
      'Read the CV-mave privacy policy and learn how personal information is handled on the site.',
    allowAds: false,
    robots: 'index,follow',
  },
};

const upsertMetaTag = (name, content) => {
  let tag = document.head.querySelector(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const ensureAdSenseScript = () => {
  if (document.getElementById(ADSENSE_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement('script');
  script.id = ADSENSE_SCRIPT_ID;
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
};

const removeAdSenseScript = () => {
  const existingScript = document.getElementById(ADSENSE_SCRIPT_ID);
  if (existingScript) {
    existingScript.remove();
  }
};

const RouteExperienceManager = () => {
  const location = useLocation();
  const config = routeConfig[location.pathname] || routeConfig['/'];

  useEffect(() => {
    document.title = config.title;
    upsertMetaTag('description', config.description);
    upsertMetaTag('robots', config.robots);

    if (config.allowAds) {
      ensureAdSenseScript();
      return;
    }

    removeAdSenseScript();
  }, [config]);

  return null;
};

export default RouteExperienceManager;
