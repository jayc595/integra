import { usePathname } from "next/navigation";

export const useApplicationName = () => {
    const pathname = usePathname(); // Get the full pathname from the URL
    const segments = pathname.split("/"); // Split the pathname into segments

    // Find the index of 'app' and get the segment after it
    const appIndex = segments.indexOf("app");

    // Extract the application name if 'app' is found and there is a segment after it
    const appName = appIndex !== -1 && segments.length > appIndex + 1
        ? segments[appIndex + 1]
        : false;

    return appName; // Returns null if '/app/{APP_NAME}' does not exist
};
