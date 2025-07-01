import { LoadingSpinner } from "@deskpro/app-sdk";
// import { useCheckIsAuth } from "./hooks";
import { useState, useEffect } from "react";
import { Button } from "@deskpro/deskpro-ui";

const LoadingAppPage = () => {
    // useCheckIsAuth();

    const [errorState, setErrorState] = useState<string | null>(null)

    useEffect(() => {
        if (errorState === "left") {
            throw new Error("Hello from TeamViewer")
        }

        if (errorState === "right") {
            throw "HI from TeamViewer"
        }



    }, [errorState])

    return (
        <>
            <Button
                text="Left Error"
                onClick={() => { setErrorState("left") }}
            />
            <Button
                text="Right Error"
                onClick={() => { setErrorState("right") }}
            />
            <LoadingSpinner />
        </>
    );
}

export { LoadingAppPage };
