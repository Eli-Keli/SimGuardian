
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ActivityLogsFilterProps {
  selectedTypes: string[];
  onSelectTypes: (types: string[]) => void;
  logTypes: string[];
}

export const ActivityLogsFilter = ({ 
  selectedTypes, 
  onSelectTypes,
  logTypes
}: ActivityLogsFilterProps) => {
  const handleSelect = (type: string) => {
    if (selectedTypes.includes(type)) {
      onSelectTypes(selectedTypes.filter(t => t !== type));
    } else {
      onSelectTypes([...selectedTypes, type]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedTypes.length === logTypes.length) {
      onSelectTypes([]);
    } else {
      onSelectTypes([...logTypes]);
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filter</span>
          {selectedTypes.length > 0 && (
            <span className="ml-1 bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs">
              {selectedTypes.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedTypes.length === logTypes.length}
          onCheckedChange={handleSelectAll}
        >
          All Types
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {logTypes.map(type => (
          <DropdownMenuCheckboxItem
            key={type}
            checked={selectedTypes.includes(type)}
            onCheckedChange={() => handleSelect(type)}
          >
            {type.replace(/_/g, ' ')}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
