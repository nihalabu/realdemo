import "./globals.css";

export const metadata = {
  title: "Apex Realty",
  description: "Find your perfect property",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}