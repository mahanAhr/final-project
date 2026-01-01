import Providers from "./providers";
import Header from "./Header"; 

export const metadata = {
  title: "Final Project",
  description: "My Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body>
        <Providers>
          <Header />
          {children}
          
        </Providers>
      </body>
    </html>
  );
}
