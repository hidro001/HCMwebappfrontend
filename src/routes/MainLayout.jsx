// import { useState, useEffect } from "react";
// import { Sidebar, Breadcrumb, Navbar, SubMenuTabs } from "../components";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { menuItems } from "../config/menuConfig";
// import useAuthStore from "../store/store";
// import ChatNotification from "../components/chats/ChatNotification";

// const MainLayout = () => {
//   const [collapsed, setCollapsed] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const currentPath = location.pathname;
//   const userPermissions = useAuthStore((state) => state.permissions);

//   // Scroll to top whenever the route changes
//   useEffect(() => {
//     const scrollableDiv = document.getElementById("scrollableDiv");
//     if (scrollableDiv) {
//       scrollableDiv.scrollTop = 0;
//     }
//   }, [currentPath]);

//   let activeSection = null;
//   let activeOption = null;

//   // Find activeSection and activeOption
//   for (const item of menuItems) {
//     for (const opt of item.options) {
//       if (opt.link === currentPath) {
//         activeSection = item;
//         activeOption = opt;
//         break;
//       }
//     }
//     if (activeSection) break;
//   }

//   // Filter the sub-options for the active section by userPermissions
//   const filteredSubOptions = activeSection
//     ? activeSection.options.filter((sub) =>
//         userPermissions.includes(sub.permission)
//       )
//     : [];

//   const handleSectionSelect = (menuItem) => {
//     if (menuItem.options?.length) {
//       // Pick the first item in the sub-menu if it exists (and user has permission)
//       // But you might want to filter these as well if you want to ensure we only navigate to allowed submenus
//       const permittedOptions = menuItem.options.filter((opt) =>
//         userPermissions.includes(opt.permission)
//       );
//       if (permittedOptions.length > 0) {
//         navigate(permittedOptions[0].link);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="h-screen text-text-primary dark:bg-black bg-gray-50 flex flex-col">
//         <Navbar />

//         <div className="flex flex-row flex-1 pt-[52px] overflow-hidden">
//           <Sidebar
//             onSectionSelect={handleSectionSelect}
//             collapsed={collapsed}
//             setCollapsed={setCollapsed}
//           />

//           <div className="flex-1 h-screen flex flex-col w-full overflow-x-scroll hide-horizontal-scrollbar">
//             <Breadcrumb />

//             {/* Show horizontal sub-menu tabs if we have a valid activeSection */}
//             <SubMenuTabs
//               activeSection={activeSection}
//               filteredSubOptions={filteredSubOptions}
//             />

//             <div
//               id="scrollableDiv"
//               className={`
//                 scroll-stabilize
//                 flex-1 h-screen overflow-y-auto overflow-x-hidden w-full
//                 [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//                 transition-colors duration-300
//               `}
//             >
//               {/* Page Content */}
//               <div className="container mx-auto px-4 py-3 mb-20">
//                 <Outlet />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ChatNotification />
//     </div>
//   );
// };

// export default MainLayout;

import { useState, useEffect } from "react";
import { Sidebar, Breadcrumb, Navbar, SubMenuTabs } from "../components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "../config/menuConfig";
import useAuthStore from "../store/store";
import ChatNotification from "../components/chats/ChatNotification";
import { FiArrowUp } from "react-icons/fi";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const userPermissions = useAuthStore((state) => state.permissions);

  // Scroll to top + listen to scroll position
  useEffect(() => {
    const scrollableDiv = document.getElementById("scrollableDiv");

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (scrollableDiv) {
            setShowScrollTop(scrollableDiv.scrollTop > 300);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
      scrollableDiv.scrollTop = 0;
    }

    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [currentPath]);

  const scrollToTop = () => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    if (scrollableDiv) {
      scrollableDiv.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  let activeSection = null;
  let activeOption = null;

  // Find active section/option
  for (const item of menuItems) {
    for (const opt of item.options) {
      if (opt.link === currentPath) {
        activeSection = item;
        activeOption = opt;
        break;
      }
    }
    if (activeSection) break;
  }

  const filteredSubOptions = activeSection
    ? activeSection.options.filter((sub) =>
        userPermissions.includes(sub.permission)
      )
    : [];

  const handleSectionSelect = (menuItem) => {
    if (menuItem.options?.length) {
      const permittedOptions = menuItem.options.filter((opt) =>
        userPermissions.includes(opt.permission)
      );
      if (permittedOptions.length > 0) {
        navigate(permittedOptions[0].link);
      }
    }
  };

  return (
    <div>
      <div className="h-screen text-text-primary dark:bg-black bg-gray-50 flex flex-col">
        <Navbar />

        <div className="flex flex-row flex-1 pt-[52px] overflow-hidden">
          <Sidebar
            onSectionSelect={handleSectionSelect}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />

          <div className="flex-1 h-screen flex flex-col w-full overflow-x-scroll hide-horizontal-scrollbar">
            <Breadcrumb />

            <SubMenuTabs
              activeSection={activeSection}
              filteredSubOptions={filteredSubOptions}
            />

            <div
              id="scrollableDiv"
              className={`
                scroll-stabilize
                flex-1 h-screen overflow-y-auto overflow-x-hidden w-full
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300
              `}
            >
              <div className="container mx-auto px-4 py-3 mb-20">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 dark:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50"
        >
          <FiArrowUp size={20} />
        </button>
      )}

      <ChatNotification />
    </div>
  );
};

export default MainLayout;
