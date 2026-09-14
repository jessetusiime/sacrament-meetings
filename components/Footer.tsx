export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-4 px-6 mt-8">
            <div className="container mx-auto text-center text-sm">
                &copy; {new Date().getFullYear()} Sacrament Meeting Planner — for church use only.
            </div>
        </footer>
    );
}