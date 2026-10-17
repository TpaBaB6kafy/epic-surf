import { getBoardTypeLabel } from "../../data/rentalBoards";
import { boardSpecs } from "../../data/rentalPage";

// Shared grid cells reserve the largest actual translated entry at this width.
// Inactive entries participate in sizing but are hidden from sight and AT.
export default function RentalBoardInformation({ boards, activeId, lang, ui }) {
  const ru = lang === "ru";
  const state = board => ({
    "data-active": board.id === activeId,
    "aria-hidden": board.id !== activeId || undefined,
  });
  return <>
    <div className="rv-board-title-stack" aria-live="polite" aria-atomic="true">
      {boards.map(board => <div key={board.id} {...state(board)} className="rv-desktop-board-title rv-board-stack-entry">
        <span>{getBoardTypeLabel(board.type, lang)}</span><h3>{board.displayName || board.name}</h3>
      </div>)}
    </div>
    <div className="rv-board-description-stack">
      {boards.map(board => <p key={board.id} {...state(board)} className="rv-board-description rv-board-stack-entry">{board.description}</p>)}
    </div>
    <div className="rv-board-specs-stack">
      {boards.map(board => {
        const specs = [...boardSpecs(board, lang, ui), ...(!board.finSetup ? [[ru ? "Волны" : "Waves", board.waves]] : []), [ui.specs[4], ui.leash]];
        return <dl key={board.id} {...state(board)} className="rv-specs rv-board-stack-entry">{specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
      })}
    </div>
  </>;
}
