
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Sidebar, Breadcrumb, Navbar, SubMenuTabs } from "../components";
import { Outlet, useNavigate, useLocation, useMatches } from "react-router-dom";
import { menuItems } from "../config/menuConfig";
import useAuthStore from "../store/store";
import ChatNotification from "../components/chats/ChatNotification";
import { FiArrowUp } from "react-icons/fi";
import { renderHelpSection } from "../config/HelpConfig";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollPositionRef = useRef(0);
  const tickingRef = useRef(false);
  const scrollableRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMatches();

  const currentPath = useMemo(() => location.pathname, [location.pathname]);

  const matchWithHelp = useMemo(
    () => [...matches].reverse().find((m) => m.handle?.helpKey),
    [matches]
  );

  const helpKey = useMemo(
    () => matchWithHelp?.handle?.helpKey,
    [matchWithHelp]
  );

  const userPermissions = useAuthStore(
    useCallback((state) => state.permissions, [])
  );

  const { activeSection, activeOption } = useMemo(() => {
    let section = null;
    let option = null;

    for (const item of menuItems) {
      for (const opt of item.options) {
        if (opt.link === currentPath) {
          section = item;
          option = opt;
          break;
        }
      }
      if (section) break;
    }

    console.log(`options: ${JSON.stringify(menuItems)}`);

    return { activeSection: section, activeOption: option };
  }, [currentPath]);

  // Memoize filtered sub options
  const filteredSubOptions = useMemo(() => {
    if (!activeSection) return [];
    return activeSection.options.filter((sub) =>
      userPermissions.includes(sub.permission)
    );
  }, [activeSection, userPermissions]);

  // Optimize scroll handler with useCallback and throttling
  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      requestAnimationFrame(() => {
        const scrollableDiv = scrollableRef.current;
        if (scrollableDiv) {
          const scrollTop = scrollableDiv.scrollTop;
          scrollPositionRef.current = scrollTop;

          // Only update state if there's a meaningful change
          const shouldShow = scrollTop > 300;
          setShowScrollTop((prev) => (prev !== shouldShow ? shouldShow : prev));
        }
        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  }, []);

  // Optimize scroll to top function
  const scrollToTop = useCallback(() => {
    const scrollableDiv = scrollableRef.current;
    if (scrollableDiv) {
      scrollableDiv.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  // Optimize section select handler
  const handleSectionSelect = useCallback(
    (menuItem) => {
      if (menuItem.options?.length) {
        const permittedOptions = menuItem.options.filter((opt) =>
          userPermissions.includes(opt.permission)
        );
        if (permittedOptions.length > 0) {
          navigate(permittedOptions[0].link);
        }
      }
    },
    [userPermissions, navigate]
  );

  // Optimize scroll effect
  useEffect(() => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    scrollableRef.current = scrollableDiv;

    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll, { passive: true });
      scrollableDiv.scrollTop = 0;
    }

    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [currentPath, handleScroll]);

  // Memoize scroll button styles to prevent re-calculation
  const scrollButtonStyles = useMemo(
    () =>
      "fixed bottom-6 right-6 bg-blue-600 dark:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition-opacity duration-200",
    []
  );

  // Memoize scrollable div styles
  const scrollableDivStyles = useMemo(
    () => `
    scroll-stabilize
    flex-1 h-screen overflow-y-auto overflow-x-hidden w-full
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
    transition-colors duration-300
  `,
    []
  );

  return (
    <div>
      <div className="h-screen text-text-primary dark:bg-black bg-gray-50 flex flex-col ">
        {/* Navbar is likely already optimized, but wrap in memo if needed */}
        <Navbar />

        <div className="flex flex-row flex-1 pt-[52px] overflow-hidden ">
          <Sidebar
            onSectionSelect={handleSectionSelect}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />

          <div className="flex-1 h-screen flex flex-col w-full overflow-x-scroll hide-horizontal-scrollbar">
            <SubMenuTabs
              activeSection={activeSection}
              filteredSubOptions={filteredSubOptions}
              helpKey={helpKey}
            />

            <div
              id="scrollableDiv"
              ref={scrollableRef}
              className={scrollableDivStyles}
            >
              <div className="container mx-auto px-4 py-3 mb-14">
                {/* Outlet renders the current route component */}
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render scroll button with fade animation */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={scrollButtonStyles}
          aria-label="Scroll to top"
        >
          <FiArrowUp size={20} />
        </button>
      )}

      {/* ChatNotification likely handles its own optimization */}
      <ChatNotification />
    </div>
  );
};

export default MainLayout;
