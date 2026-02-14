export const toggleSidebar = () => {
  window.dispatchEvent(new CustomEvent("toggle-sidebar"));
};

export const openSidebar = () => {
  window.dispatchEvent(new CustomEvent("sidebar-state", { detail: { open: true } }));
};

export const closeSidebar = () => {
  window.dispatchEvent(new CustomEvent("sidebar-state", { detail: { open: false } }));
};
