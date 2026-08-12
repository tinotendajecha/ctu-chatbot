import Chip from "../ui/Chip";

interface SuggestedChipsProps {
  chips: string[];
  onSelect: (text: string) => void;
}

export default function SuggestedChips({ chips, onSelect }: SuggestedChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4">
      {chips.map((chip) => (
        <Chip key={chip} onClick={() => onSelect(chip)}>
          {chip}
        </Chip>
      ))}
    </div>
  );
}
