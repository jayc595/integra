"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useDebounceValue } from "usehooks-ts";
import {
    ChangeEvent,
    useEffect,
    useState,
} from "react";
import { Input } from "@/components/ui/input";


export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [debouncedValue, _] = useDebounceValue<string>(value, 500, {
        // Optional: specify options here
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    //@TODO - the below currently causes an issue where it'll refresh to /board.
    // useEffect(() => {
    //     const url = qs.stringifyUrl({
    //         url: "/board",
    //         query: {
    //             search: debouncedValue,
    //         },
    //     }, { skipEmptyString: true, skipNull: true })
    //     router.push(url)
    // }, [debouncedValue, router]);

    return (
        <div className="w-full relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-forground h-4 w-4"/>
            <Input className="w-full max-w-[516px] pl-9" placeholder="Search Canvas" onChange={handleChange} value={value}></Input>
        </div>
    );
};