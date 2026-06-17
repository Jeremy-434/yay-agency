const SimpleFooter: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-[var(--color-redesign-border)] py-8 md:py-12 px-6 md:px-8 bg-[var(--color-redesign-bg)]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs md:text-sm text-white/60 flex flex-col sm:flex-row gap-2 items-center justify-center">
          <span>Copyrights 2026 InvenioAgency™</span>
          <span className="hidden sm:inline">·</span>
          <a
            href="/privacy"
            className="text-[var(--color-redesign-cyan)] hover:text-[var(--color-redesign-emerald)] transition-colors duration-200 underline"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default SimpleFooter;
