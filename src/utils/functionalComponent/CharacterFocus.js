import React, { useEffect } from "react";
import CharacterCardUpper from '../../components/CharacterCardUpper'
import CharacterCardLower from '../../components/CharacterCardLower'
import { useSelectiveFocus } from "../useSelectiveFocus";
export default function CharacterFocus(props) {
    const { characterView } = useSelectiveFocus();
    useEffect(() => {
    }, [])

    return (
        <section className="scrollable">
            <CharacterCardUpper
                name={characterView.name} />
            <CharacterCardLower
                notes={characterView.notes}
                relationships={characterView.relationships} />
        </section>
    )
}