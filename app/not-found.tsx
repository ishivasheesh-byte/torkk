import Link from 'next/link'
export default function NotFound(){return <main className="error-page"><span className="eyebrow">404</span><h1>Looks like this route took a wrong turn.</h1><Link className="btn btn-primary" href="/">Back to Home</Link></main>}
