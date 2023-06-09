import { Metadata } from "next";

export const metadata:Metadata = {
    title: 'Suggestions',
    description: ''
}
interface IProps {
    children: React.ReactNode;
}

export default function SuggestionLayout({children}:IProps){
    return (
        <main className="overflow-scroll bg-zinc-100">
            {children}        
        </main>
    );
}
