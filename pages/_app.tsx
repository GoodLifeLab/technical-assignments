import "@/styles/tailwind.css"

import { Noto_Serif_KR, Poppins, Rubik } from "next/font/google"

const poppinsFonts = Poppins({
  subsets: ["latin"],
  weight: ["200", "600", "700", "800"],
  variable: "--font-poppins",
})

const rubikFonts = Rubik({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-rubik",
})

const notoSerifFonts = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-notoserif",
})

export default function App({ Component, pageProps }) {
  return (
    <section
      className={`font-pretendard ${poppinsFonts.variable} ${rubikFonts.variable} ${notoSerifFonts.variable} font-sans`}
    >
      <Component {...pageProps} />
    </section>
  )
}
