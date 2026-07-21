import { Analytics } from '@vercel/analytics/next';
import Footer from '@/components/main/Footer'
import { Navbar } from '@/components/main/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ishan Tharusha - Full-Stack Developer Portfolio',
  description:
    'Full-Stack Developer building web applications with ASP.NET Core, Node.js, React, and Spring Boot. View my portfolio, projects, and experience.',
  keywords: [
    'full-stack developer',
    'portfolio',
    'ishan tharusha',
    'web developer',
    'ASP.NET Core',
    'React',
    'Node.js',
    'Spring Boot',
    'portfolio website',
    'TypeScript',
    'C#',
    'Java',
    'Sri Lanka developer',
  ],
  authors: [{ name: 'Ishan Tharusha' }],
  creator: 'Ishan Tharusha',
  publisher: 'Ishan Tharusha',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-yy9r.vercel.app',
    title: 'Ishan Tharusha - Full-Stack Developer Portfolio',
    description: 'Full-Stack Developer building web applications with ASP.NET Core, Node.js, React, and Spring Boot.',
    siteName: 'Ishan Tharusha Portfolio',
    images: [
      {
        url: '/profile_pic.jpg',
        width: 1200,
        height: 630,
        alt: 'Ishan Tharusha - Full-Stack Developer',
      },
    ],
  },
  alternates: {
    canonical: 'https://portfolio-yy9r.vercel.app',
  },
  verification: {
    google: 'wUvigUYIHyBvrQMmeBFTg5ixr4HDAdPcPPlyPJSzmc0',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ishan Tharusha',
    jobTitle: 'Junior Full-Stack Developer',
    description: 'Junior Full-Stack Developer passionate about building end-to-end web applications using ASP.NET Core, Node.js, React, and Spring Boot',
    url: 'https://portfolio-yy9r.vercel.app',
    image: '/profile_pic.jpg',
    email: 'Ishantharusha02@gmail.com',
    telephone: '+94786733876',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LK',
    },
    sameAs: [
      'https://github.com/Ishan-Tharusha',
      'https://www.linkedin.com/in/ishantharusha',
    ],
    knowsAbout: [
      'Full-Stack Development',
      'ASP.NET Core',
      'Node.js',
      'React',
      'Next.js',
      'Spring Boot',
      'TypeScript',
      'C#',
      'Java',
      'MongoDB',
      'MySQL',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Sri Lanka Institute of Information Technology',
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://portfolio-yy9r.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8B5CF6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0f1e" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased overflow-x-hidden font-[family-name:var(--font-inter)]`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider>
            <Navbar />
            <main role="main">
              {children}
            </main>
            <Footer />
          </AnalyticsProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
