import { Analytics } from '@vercel/analytics/next';
import Footer from '@/components/main/Footer'
import { Navbar } from '@/components/main/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    url: 'https://hasan-ashab.vercel.app',
    title: 'Ishan Tharusha - Full-Stack Developer Portfolio',
    description: 'Full-Stack Developer building web applications with ASP.NET Core, Node.js, React, and Spring Boot.',
    siteName: 'Ishan Tharusha Portfolio',
    images: [
      {
        url: '/profile-pic.png',
        width: 1200,
        height: 630,
        alt: 'Ishan Tharusha - Full-Stack Developer',
      },
    ],
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Hasan Ashab - DevOps & Cloud Engineer Portfolio',
  //   description: 'Experienced DevOps and Cloud Engineer specializing in AWS, Kubernetes, Docker, and CI/CD.',
  //   images: ['/profile-pic.png'],
  //   creator: '@hasanashab',
  // },
  alternates: {
    canonical: 'https://hasan-ashab.vercel.app',
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
    name: 'Hasan Ashab',
    jobTitle: 'DevOps & Cloud Engineer',
    description: 'Experienced DevOps and Cloud Engineer specializing in AWS, Kubernetes, Docker, and CI/CD automation',
    url: 'https://hasan-ashab.vercel.app',
    image: 'https://hasan-ashab.vercel.app/profile-pic.jpg',
    sameAs: [
      'https://github.com/Ishan-Tharusha',
      'https://www.linkedin.com/in/ishantharusha',
    ],
    knowsAbout: [
      'DevOps',
      'Cloud Engineering', 
      'AWS',
      'Kubernetes',
      'Docker',
      'CI/CD',
      'Infrastructure as Code',
      'Terraform',
      'Ansible',
      'Jenkins',
      'Monitoring',
      'Automation'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Elevate Labs'
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://hasan-ashab.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
