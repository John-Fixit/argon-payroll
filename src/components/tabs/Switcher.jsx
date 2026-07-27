const Switcher = () => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">
          Tab
        </label>

        <select id="Tab" className="w-full rounded-md border-gray-200">
          <option>Settings</option>
          <option>Messages</option>
          <option>Archive</option>
          <option>Notifications</option>
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6">
            <a
              href="#"
              className="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Settings
            </a>

            <a
              href="#"
              className="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Messages
            </a>

            <a
              href="#"
              className="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Archive
            </a>

            <a
              href="#"
              className="shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-sky-600"
            >
              Notifications
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Switcher;
