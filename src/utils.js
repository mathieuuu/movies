export const NB_COLUMNS = 5;
export const NB_ROWS = 3;
export const PAGE_SIZE = NB_COLUMNS * NB_ROWS;

export const moveSelectedIndex = (evt, selectedIndex, setSelectedIndex, nbTotalPosters) => {
    evt.preventDefault();

    switch (evt.keyCode) {
        case 38:
            // FLECHE HAUT
            if (selectedIndex % PAGE_SIZE >= NB_COLUMNS) // inactif sur 1e ligne
                setSelectedIndex(selectedIndex - NB_COLUMNS); // y-1
            break;

        case 40:
            // FLECHE BAS
            if (selectedIndex % PAGE_SIZE < NB_COLUMNS * (NB_ROWS - 1)) { // inactif sur derniere ligne
                if (selectedIndex + NB_COLUMNS < nbTotalPosters)
                    setSelectedIndex(selectedIndex + NB_COLUMNS); // y+1
                else if (nbTotalPosters >= selectedIndex + (NB_COLUMNS - selectedIndex % NB_COLUMNS))
                    setSelectedIndex(nbTotalPosters - 1); // => dernière page, dernier element
            }
            break;

        case 37:
            // FLECHE GAUCHE
            if (selectedIndex % NB_COLUMNS > 0) {
                setSelectedIndex(selectedIndex - 1) // x-1
            } else if (selectedIndex - NB_COLUMNS * 2 - 1 < 0) {
                // cas 1e page
                if (selectedIndex < NB_COLUMNS) // 1e ligne
                    setSelectedIndex(Math.min(nbTotalPosters - 1, Math.floor(nbTotalPosters / PAGE_SIZE) * PAGE_SIZE + NB_COLUMNS - 1)); // => dernière page, 1 ligne
                else if (selectedIndex < NB_COLUMNS * 2) // 2e ligne
                    setSelectedIndex(Math.min(nbTotalPosters - 1, Math.floor(nbTotalPosters / PAGE_SIZE) * PAGE_SIZE + NB_COLUMNS * 2 - 1)); // => dernière page, 2e ligne
                else
                    setSelectedIndex(nbTotalPosters - 1); // => dernière page, dernier element
            } else {
                setSelectedIndex(selectedIndex - NB_COLUMNS * 2 - 1) // page-1
            }
            break;

        case 39:
            // FLECHE DROITE
            if (selectedIndex % NB_COLUMNS < NB_COLUMNS-1 && selectedIndex + 1 < nbTotalPosters) {
                setSelectedIndex(selectedIndex + 1); // x+1
            } else if (selectedIndex + NB_COLUMNS*2 + 1 > nbTotalPosters-1) {
                // cas fin de liste
                if (selectedIndex >= nbTotalPosters - nbTotalPosters%PAGE_SIZE) {
                    // cas derniere page
                    setSelectedIndex(Math.floor(selectedIndex % PAGE_SIZE / NB_COLUMNS) * NB_COLUMNS); // => 1e page
                } else {
                    // cas avant derniere page
                    if (selectedIndex + NB_COLUMNS + 1 < nbTotalPosters)
                        setSelectedIndex(selectedIndex + NB_COLUMNS + 1); // => derniere page, x-1
                    else
                        setSelectedIndex(selectedIndex + 1); // => derniere page, x-2
                }
            } else {
                setSelectedIndex(selectedIndex + NB_COLUMNS * 2 + 1); // page+1
            }
            break;

        default:
    }
}