"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 100%;
  border-radius: 5px;
  outline: none;
  background: white;
  position: relative;
`;

const DropdownButton = styled.button`
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  margin-top: 15px;
  left: 0;
  width: 101%;
  max-height: 400px;
  border-radius: 5px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: 10px 0px 0px 0px;
  gap: 10px;
  z-index: 100;
  transform-origin: top;
  animation: DropdownMenuAppear 0.25s ease;
  @keyframes DropdownMenuAppear {
    from {
      opacity: 0;
      transform: scaleY(0);
    }
    to {
      opacity: 1;
      transform: scaleY(1);
    }
  }
`;

const SearchInput = styled.input`
  height: 40px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding: 0px 10px;
  font-size: 14px;
  position: relative;
  width: 94%;
  &::placeholder {
    font-weight: 300;
    font-size: 14px;
  }
`;

const DropdownItemsContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px 0px;
  position: relative;
`;

const DropdownItem = styled.div`
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  &.selected {
    color: red;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 40px;
  bottom: 0px;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export type TDropdownItem = {
  value: any;
  label: string;
};

type Props = {
  selectedItem: TDropdownItem | null;
  dropdownItems: TDropdownItem[];
  onSelectItem?: (item: TDropdownItem) => void;
  footer?: React.ReactNode;
};

const SelectWithSearch: React.FC<Props> = ({
  selectedItem = null,
  dropdownItems,
  onSelectItem,
  footer,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [foundValues, setFoundValues] =
    useState<TDropdownItem[]>(dropdownItems);

  useEffect(() => {
    if (search.length > 0) {
      const foundValues = dropdownItems.filter((item) =>
        item.label.toUpperCase().includes(search.toUpperCase())
      );
      setFoundValues(foundValues);
    } else {
      setFoundValues(dropdownItems);
    }
  }, [search]);

  return (
    <Container>
      <DropdownButton
        onClick={() => {
          setOpenDropdown(!openDropdown);
        }}
      >
        {selectedItem !== null ? selectedItem.label : "Please select"}
      </DropdownButton>
      {openDropdown && (
        <DropdownMenu>
          <SearchInput
            placeholder="Please input at least 1 character"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <DropdownItemsContainer>
            {foundValues.map((item) => (
              <DropdownItem
                className={item.value === selectedItem?.value ? "selected" : "not-selected"}
                onClick={(e) => {
                  setSearch("");
                  onSelectItem && onSelectItem(item);
                  setTimeout(() => setOpenDropdown(false), 10);
                }}
                key={item.value}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownItemsContainer>
          {footer && <Footer>{footer}</Footer>}
        </DropdownMenu>
      )}
    </Container>
  );
};

export default SelectWithSearch;
