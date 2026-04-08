import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HashScrollManager from "@/components/navigation/HashScrollManager";
import { getPrimaryNavigation, getSiteContent } from "@/lib/content";

interface SiteShellProps {
  children: ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  const content = getSiteContent();
  const navigation = getPrimaryNavigation();

  return (
    <>
      <HashScrollManager />
      <Header title={content.header.title} subtitle={content.header.subtitle} navigation={navigation} />
      <main className="flex-1">{children}</main>
      <Footer
        title={content.header.title}
        subtitle={content.header.subtitle}
        copyright={content.footer.copyright}
        email={content.contact.info.email}
        navigation={navigation}
        socialLinks={content.contact.social_links}
      />
    </>
  );
}
