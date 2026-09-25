import Link from 'next/link'
import { SiteShell } from '@/components/site-pages'

export default function LegalPage() {
  return <SiteShell><section className="inner-hero"><div className="container"><span className="eyebrow">LEGAL</span><h1>Policies for moving with Torkk.</h1><p>Review the terms and policies that apply to the Torkk website and services.</p></div></section><section className="inner-section"><div className="container route-sections"><Link className="legal-link" href="/terms">Terms &amp; Conditions</Link><Link className="legal-link" href="/privacy">Privacy Policy</Link><Link className="legal-link" href="/cancellation-refund">Cancellation &amp; Refund</Link><Link className="legal-link" href="/cookies">Cookies Policy</Link></div></section></SiteShell>
}
