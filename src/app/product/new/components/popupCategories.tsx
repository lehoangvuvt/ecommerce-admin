import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { formatLongString } from "@/utils/string.utils";
import nextRedIcon from "/public/icon/next-red.svg";
import nextBlackIcon from "/public/icon/next-black.svg";
import Image from "next/image";
import MyButton from "@/components/Button";
import { TCategory } from "@/types/api.type";

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 65%;
  height: 550px;
  background: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  overflow: hidden;
  padding: 5px;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  flex: 1;
`;

const Categories = styled.div`
  height: 65%;
  display: flex;
  gap: 20px;
  overflow-y: auto;
  width: 95%;
  flex-flow: column wrap;
  position: relative;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  transition: transform 0.5s ease;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: white;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: black;
  }
`;

const CategoriesCol = styled.div`
  position: relative;
  width: 25%;
  height: 100%;
  overflow-y: scroll;
  border-right: 1px solid rgba(0,0,0,0.1);
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: white !important;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.6) !important;
    border-radius: 10px !important;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555 !important;
  }
`;

const CategoryItem = styled.button`
  width: 100%;
  height: 35px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 15px;
  color: rgba(0, 0, 0, 0.9);
  cursor: pointer;
  border: none;
  outline: none;
  &:disabled {
    color: red;
    font-weight: bold;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-flow: row wrap;
  padding-top: 10px;
  overflow: hidden;
`;

const SelectedInfo = styled.div`
  width: 70%;
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.9);
`;

const FooterButtons = styled.div`
  width: 30%;
  height: 100%;
  padding: 0px 20px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-end;
`;

const SlideController = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  pointer-events: none;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

interface OpenCategoryType {
  id: string | null;
  items: TCategory[];
}

interface Props {
  categories: TCategory[];
  selectCategory: (category: {
    category_name: string;
    id: string;
    path: string;
  }) => void;
  togglePopup: (state: boolean) => void;
}

const PopupCategories: React.FC<Props> = ({
  categories,
  togglePopup,
  selectCategory,
}) => {
  const buttonStyle: any = {
    fontSize: "0px",
    width: "40px",
    height: "40px",
    background: "rgba(0,0,0,0.2)",
    fontColor: "white",
    customStyle: {
      pointerEvents: "auto",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
  const [openCategories, setOpenCategories] = useState<Array<OpenCategoryType>>(
    []
  );
  const [selectedCategories, setSelectedCatogries] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [canConfirm, setCanConfirm] = useState<boolean>(false);
  const [isOverflow, setOverflow] = useState<boolean>(false);

  useEffect(() => {
    if (categories && categories.length > 0) {
      let newOpenCategories: Array<OpenCategoryType> = [];
      newOpenCategories.push({ id: "All", items: categories });
      setOpenCategories(newOpenCategories);
    }
  }, [categories]);

  const handleOnOpen = (name: string, id: string, items: Array<any>) => {
    setCanConfirm(false);
    let parentIndex = 0;
    let newOpenCategories: Array<OpenCategoryType> = [];
    for (let i = openCategories.length - 1; i > 0; i--) {
      const openItems = openCategories[i].items;
      if (openItems.filter((item) => item.id == id).length > 0) {
        parentIndex = i;
      }
    }
    if (parentIndex > 0) {
      if (parentIndex == openCategories.length - 1) {
        newOpenCategories = Object.assign(
          [],
          [...openCategories, { id, items }]
        );
        setSelectedCatogries((oldSCategories) => [
          ...oldSCategories,
          { name, id },
        ]);
      } else {
        newOpenCategories = Object.assign(
          [],
          [...openCategories.slice(0, parentIndex + 1), { id, items }]
        );
        setSelectedCatogries((oldSCategories) => [
          ...oldSCategories.slice(0, parentIndex),
          { name, id },
        ]);
      }
    } else {
      newOpenCategories = [
        { id: null, items: categories },
        { id, items },
      ];
      setSelectedCatogries([{ name, id }]);
    }
    if (items.length == 0) setCanConfirm(true);
    setOpenCategories(newOpenCategories);
  };

  const checkIfCanOpen = (id: string): boolean => {
    let canOpen = true;
    if (
      selectedCategories.filter((sCategory) => sCategory.id == id).length > 0
    ) {
      canOpen = false;
    }
    return canOpen;
  };

  const getSelectedCategoriesString = (): string => {
    let selectedCategoriesString = "";
    selectedCategories.forEach((sCate) => {
      selectedCategoriesString += sCate.name + " > ";
    });
    return selectedCategoriesString.substring(
      0,
      selectedCategoriesString.length - 2
    );
  };

  const handleSlide = (direction: "left" | "right") => {
    const categoriesContainer: HTMLElement | null = document.getElementById(
      "categories-container"
    );
    switch (direction) {
      case "right":
        categoriesContainer?.scrollTo({
          behavior: "smooth",
          left:
            categoriesContainer.scrollLeft +
            categoriesContainer.scrollWidth / 6,
        });
        break;
      case "left":
        categoriesContainer?.scrollTo({
          behavior: "smooth",
          left:
            categoriesContainer.scrollLeft -
            categoriesContainer.scrollWidth / 6,
        });
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (openCategories.length > 3) {
      setOverflow(true);
    } else {
      setOverflow(false);
    }
  }, [openCategories]);

  useEffect(() => {
    const categoriesContainer: HTMLElement | null = document.getElementById(
      "categories-container"
    );
    categoriesContainer?.scrollTo({
      behavior: "smooth",
      left: categoriesContainer.scrollWidth,
    });
  }, [openCategories.length]);

  const handleOnConfirm = () => {
    const { id, name } = selectedCategories[selectedCategories.length - 1];
    const path = getSelectedCategoriesString();
    selectCategory({ category_name: name, id, path });
    togglePopup(true);
  };

  return (
    <Background>
      <Container>
        <Header></Header>
        <Categories id="categories-container">
          {openCategories &&
            openCategories.length > 0 &&
            openCategories.map(
              (oCategory) =>
                oCategory.items.length > 0 && (
                  <CategoriesCol key={oCategory.id}>
                    {oCategory.items.map((item) => (
                      <CategoryItem
                        disabled={!checkIfCanOpen(item.id)}
                        onClick={() =>
                          handleOnOpen(
                            item.category_name,
                            item.id,
                            item.child ?? []
                          )
                        }
                        key={item.id}
                      >
                        {formatLongString(item.category_name, 25)}
                        {item.child &&
                          item.child.length > 0 &&
                          (checkIfCanOpen(item.id) ? (
                            <Image
                              alt="next-black-icon"
                              width={10}
                              height={10}
                              src={nextBlackIcon.src}
                            />
                          ) : (
                            <Image
                              alt="next-red-icon"
                              width={10}
                              height={10}
                              src={nextRedIcon.src}
                            />
                          ))}
                      </CategoryItem>
                    ))}
                  </CategoriesCol>
                )
            )}
        </Categories>
        <Footer>
          <SelectedInfo>
            Selected: &nbsp;
            {selectedCategories.length > 0 ? (
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {getSelectedCategoriesString()}
              </span>
            ) : (
              <span style={{ color: "rgba(0,0,0,0.55)" }}>Empty</span>
            )}
          </SelectedInfo>
          <FooterButtons>
            <MyButton
              width="110px"
              height="32px"
              background="transparent"
              fontColor="rgba(0,0,0,0.8)"
              fontSize="15px"
              customStyle={{
                borderRadius: "4px",
              }}
              onClick={() => togglePopup(false)}
            >
              Cancel
            </MyButton>

            <MyButton
              onClick={handleOnConfirm}
              disabled={!canConfirm}
              width="100px"
              height="32px"
              background="red"
              fontColor="white"
              fontSize="15px"
              customStyle={{ borderRadius: "4px" }}
            >
              Confirm
            </MyButton>
          </FooterButtons>
        </Footer>
        {isOverflow && (
          <>
            <SlideController>
              <MyButton onClick={() => handleSlide("left")} {...buttonStyle}>
                <Image
                  height={15}
                  width={15}
                  src={nextBlackIcon.src}
                  alt="prev-icon"
                  style={{ transform: "rotate(180deg)" }}
                />
              </MyButton>
              <MyButton onClick={() => handleSlide("right")} {...buttonStyle}>
                <Image
                  height={15}
                  width={15}
                  src={nextBlackIcon.src}
                  alt="prev-icon"
                />
              </MyButton>
            </SlideController>
          </>
        )}
      </Container>
    </Background>
  );
};

export default PopupCategories;
