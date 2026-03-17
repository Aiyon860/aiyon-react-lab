import { Link } from "react-router";

export default function MainMenu() {
  const hooks = [
    {
      id: "usestate",
      path: "/usestate",
      name: "useState",
      desc: "Demo managing local state and UI interactions.",
    },
    {
      id: "useeffect",
      path: "/useeffect",
      name: "useEffect",
      desc: "Demo side-effects, fetching APIs, and cleanup.",
    },
    {
      id: "usememo",
      path: "/usememo",
      name: "useMemo",
      desc: "Demo performance optimization with useMemo.",
    },
    {
      id: "usecallback",
      path: "/usecallback",
      name: "useCallback",
      desc: "Demo preventing re-renders with useCallback.",
    },
    {
      id: "usecontext",
      path: "/usecontext",
      name: "useContext",
      desc: "Demo sharing global data without prop-drilling.",
    },
    {
      id: "usereducer",
      path: "/usereducer",
      name: "useReducer",
      desc: "Demo managing complex state with the reducer pattern.",
    },
  ];

  return (
    <section aria-labelledby="menu-heading">
      <header className="mb-8">
        <h2
          id="menu-heading"
          className="text-3xl sm:text-4xl font-semibold tracking-tight text-content-primary"
        >
          Choose a Demo
        </h2>
        <p className="text-content-secondary mt-2 max-w-2xl">
          Focus on implementing one fundamental Hook at a time.
        </p>
      </header>

      <nav aria-label="Hook Demos List">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hooks.map((hook) => (
            <li key={hook.id}>
              {/* Added focus-visible for Keyboard (Tab) interaction */}
              <Link
                to={hook.path}
                aria-label={`View ${hook.name} demo`}
                className="block w-full h-full text-left p-6 bg-surface-raised border border-border-subtle rounded-2xl shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all duration-300 group focus-visible:ring-4 focus-visible:ring-brand-primary/50 focus-visible:outline-none"
              >
                <h3 className="text-xl font-semibold text-content-primary group-hover:text-brand-primary transition-colors">
                  {hook.name}
                </h3>
                <p className="text-content-secondary mt-2 text-sm leading-relaxed">
                  {hook.desc}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
