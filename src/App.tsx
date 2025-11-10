import React from "react";
import {
  Stack,
  Text,
  Link,
  FontWeights,
  IStackTokens,
  IStackStyles,
  ITextStyles,
  initializeIcons,
  HighContrastSelector,
  Label,
  IContextualMenuProps,
  IIconProps,
} from "@fluentui/react";
import { SearchBox } from "@fluentui/react/lib/SearchBox";
import { IDetailsListProps } from "@fluentui/react/lib/DetailsList";
import { IButtonStyles, IconButton } from "@fluentui/react/lib/Button";
import { Selection } from "@fluentui/react";
import {
  DetailsList,
  DetailsRow,
  IDetailsRowStyles,
  IDetailsRowProps,
  SelectionMode,
  getTheme,
  IDropdownOption,
  Dropdown,
} from "@fluentui/react";
import { IColumn } from "@fluentui/react";
import { DefaultButton, PrimaryButton } from "@fluentui/react";

import logo from "./logo.svg";
import "./App.css";

// Initialize Fluent UI icons
initializeIcons();

// Get the current Fluent UI theme
const theme = getTheme();

// Define the interface for each item in the DetailsList
interface IMyItem {
  key: string;
  project: string;
  task: string;
  assigned: string; // URL to avatar image
  dateCreated: string;
  dateDue: string;
  description: string;
  isDescriptionExpanded?: boolean;
}

const names = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eva",
  "Frank",
  "Grace",
  "Hannah",
  "Ian",
  "Jack",
];

// Generate sample data
const createMyItems = (count: number): IMyItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    key: `item-${i}`,
    project: projectOptions[0].key as string,
    task: `Task ${i}`,
    assigned: names[i % names.length], // names
    dateCreated: new Date(
      2025,
      0,
      Math.floor(Math.random() * 28) + 1
    ).toLocaleDateString(),
    dateDue: new Date(
      2025,
      1,
      Math.floor(Math.random() * 28) + 1
    ).toLocaleDateString(),
    description: `This is a sample description for task ${i}`,
    isDescriptionExpanded: true,
  }));
};

const projectOptions: IDropdownOption[] = [
  { key: "project0", text: "Project 0" },
  { key: "project1", text: "Project 1" },
  { key: "project2", text: "Project 2" },
  { key: "project3", text: "Project 3" },
];

// Define columns for the DetailsList
const myColumns = (
  updateProject: (index: number, newProject: string) => void,
  updateTask: (index: number, newTask: string) => void,
  toggleDescriptionExpand: (index: number) => void,
  updateDescription: (index: number, newDescription: string) => void
): IColumn[] => [
  {
    key: "project",
    name: "Project",
    fieldName: "project",
    minWidth: 100,
    maxWidth: 400,
    isResizable: true,
    onRender: (item: IMyItem, index?: number) => (
      <Dropdown
        selectedKey={item.project}
        options={projectOptions}
        onChange={(e, option) => {
          if (index !== undefined && option) {
            updateProject(index, option.key as string);
          }
        }}
      />
    ),
  },
  {
    key: "task",
    name: "Task",
    fieldName: "task",
    minWidth: 150,
    onRender: (item: IMyItem, index?: number) => (
      <input
        type="text"
        value={item.task}
        style={{
          width: "100%",
          border: "none",
          background: "transparent",
        }}
        onChange={(e) => {
          if (index !== undefined) {
            updateTask(index, e.target.value);
          }
        }}
      />
    ),
  },
  {
    key: "assigned",
    name: "Assigned",
    fieldName: "assigned",
    minWidth: 100,
    maxWidth: 80,
    isResizable: false,
    onRender: (item: IMyItem) => <span>{item.assigned}</span>,
  },
  {
    key: "dateCreated",
    name: "Date Created",
    fieldName: "dateCreated",
    minWidth: 80,
    maxWidth: 120,
  },
  {
    key: "dateDue",
    name: "Date Due",
    fieldName: "dateDue",
    minWidth: 80,
    maxWidth: 120,
  },
  {
    key: "description",
    name: "Description",
    fieldName: "description",
    minWidth: 200,
    maxWidth: 400,
    isResizable: true,
    onRender: (item: IMyItem, index?: number) => (
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
        <div
          contentEditable
          suppressContentEditableWarning
          style={{
            whiteSpace: item.isDescriptionExpanded ? "normal" : "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: item.isDescriptionExpanded ? "400px" : "200px",
            border: "1px solid #6264A7",
            padding: "2px 4px",
            borderRadius: 4,
          }}
          onBlur={(e) => {
            if (index !== undefined) {
              updateDescription(index, e.currentTarget.textContent || "");
            }
          }}
        >
          {item.description}
        </div>
        <IconButton
          iconProps={{
            iconName: item.isDescriptionExpanded ? "CollapseMenu" : "More",
          }}
          title={item.isDescriptionExpanded ? "Collapse" : "Expand"}
          onClick={() => index !== undefined && toggleDescriptionExpand(index)}
        />
      </Stack>
    ),
  },

  {
    key: "actions",
    name: "Actions",
    fieldName: "actions",
    minWidth: 100,
    maxWidth: 140,
    onRender: (item: IMyItem) => {
      // Render Add and Delete buttons for each row
      const addIcon: IIconProps = { iconName: "Add" };
      const deleteIcon: IIconProps = { iconName: "Delete" };
      // Custom button styles
      const addButtonStyles = {
        root: {
          color: "#107C10", // Fluent green
        },
        rootHovered: {
          backgroundColor: "#E6F4EA", // light green hover
          color: "#0B6A0B",
        },
      };

      const deleteButtonStyles = {
        root: {
          color: "#A4262C", // Fluent red
        },
        rootHovered: {
          backgroundColor: "#FDE7E9", // light red hover
          color: "#8E1921",
        },
      };
      return (
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <IconButton
            iconProps={addIcon}
            title="Add"
            ariaLabel="Add"
            styles={addButtonStyles}
            onClick={() => alert(`Add clicked for ${item.task}`)}
          />
          <IconButton
            iconProps={deleteIcon}
            title="Delete"
            ariaLabel="Delete"
            styles={deleteButtonStyles}
            onClick={() => alert(`Delete clicked for ${item.task}`)}
          />
        </Stack>
      );
    },
  },
];

interface IMyListState {
  items: IMyItem[];
  selectedProject: string;
}

export class MyDetailsList extends React.Component<{}, IMyListState> {
  private _selection: Selection;
  constructor(props: {}) {
    super(props);
    const items = createMyItems(10);
    this.state = { items, selectedProject: projectOptions[0].key as string };
    this._selection = new Selection({
      onSelectionChanged: () => {
        // You can handle selection changes here if needed
        console.log("Selected count:", this._selection.getSelectedCount());
      },
    });
  }

  private _updateProject = (index: number, newProject: string) => {
    const items = [...this.state.items];
    items[index].project = String(newProject);
    this.setState({ items });
  };

  private _updateTask = (index: number, newTask: string) => {
    const items = [...this.state.items];
    items[index].task = newTask;
    this.setState({ items });
  };

  private _applyProjectToAll = () => {
    const { selectedProject, items } = this.state;
    const updatedItems = items.map((item) => ({
      ...item,
      project: selectedProject,
    }));
    this.setState({ items: updatedItems });
  };

  private _updateDescription = (index: number, newDescription: string) => {
    const items = [...this.state.items];
    items[index].description = newDescription;
    this.setState({ items });
  };

  private _toggleDescriptionExpand = (index: number) => {
    const items = [...this.state.items];
    items[index].isDescriptionExpanded = !items[index].isDescriptionExpanded;
    this.setState({ items });
  };

  private _onRenderRow = (props?: IDetailsRowProps) => {
    if (!props) return null;

    const isSelected =
      props.itemIndex !== undefined &&
      props.itemIndex >= 0 &&
      props.selection?.isIndexSelected?.(props.itemIndex);

    const customStyles: Partial<IDetailsRowStyles> = {
      root: {
        backgroundColor: isSelected ? "#D1D9FF" : "white",
        minHeight: 60,
        selectors: {
          "&:hover": {
            backgroundColor: isSelected ? "#D1D9FF" : "#E8EAF6", // hover states
          },
        },
      },
      cell: {
        display: "flex",
        alignItems: "center",
      },
    };

    return <DetailsRow {...props} styles={customStyles} />;
  };

  // private _onRenderRow = (props?: IDetailsRowProps) => {
  //   if (!props) return null;

  //   const customStyles: Partial<IDetailsRowStyles> = {
  //     root: {
  //       backgroundColor:
  //         props.itemIndex % 2 === 0 ? theme.palette.themeLighterAlt : undefined,
  //       minHeight: 60,
  //     },
  //     cell: {
  //       display: "flex",
  //       alignItems: "center",
  //     },
  //   };

  //   return <DetailsRow {...props} styles={customStyles} />;
  // };

  // private _onRenderRow = (props?: IDetailsRowProps) => {
  //   const customStyles: Partial<IDetailsRowStyles> = {};
  //   if (props && props.itemIndex % 2 === 0) {
  //     customStyles.root = {
  //       backgroundColor: theme.palette.themeLighterAlt,
  //       minHeight: 60,
  //       lineHeight: "50px",
  //     };
  //   }
  //   return props ? <DetailsRow {...props} styles={customStyles} /> : null;
  // };

  render() {
    const columns = myColumns(
      this._updateProject,
      this._updateTask,
      this._toggleDescriptionExpand,
      this._updateDescription
    );
    //   if (col.key === "project") {
    //     return {
    //       ...col,
    //       onRender: (item: IMyItem, index?: number) => (
    //         <Dropdown
    //           selectedKey={item.project}
    //           options={projectOptions}
    //           onChange={(e, option) =>
    //             index !== undefined &&
    //             option &&
    //             this._updateProject(index, option.key as string)
    //           }
    //         />
    //       ),
    //     };
    //   }
    //   if (col.key === "task") {
    //     return {
    //       ...col,
    //       onRender: (item: IMyItem, index?: number) => (
    //         <input
    //           type="text"
    //           value={item.task}
    //           style={{
    //             width: "100%",
    //             border: "none",
    //             background: "transparent",
    //           }}
    //           onChange={(e) =>
    //             index !== undefined && this._updateTask(index, e.target.value)
    //           }
    //         />
    //       ),
    //     };
    //   }
    //   return col;
    // });

    return (
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
          <DefaultButton
            text="Add All Tasks to Project"
            split
            menuProps={{
              items: projectOptions.map((option) => ({
                key: option.key.toString(),
                text: option.text,
                onClick: () =>
                  this.setState({ selectedProject: option.key as string }),
              })),
            }}
            onClick={this._applyProjectToAll}
            styles={{
              root: {
                backgroundColor: "#ffffff", // default background
                color: "#6264A7", // text color
              },
              rootHovered: {
                backgroundColor: "#E8E8F6", // hover background color
                color: "#4E4FA2", // hover text color
              },
              //   rootPressed: {
              //     backgroundColor: "#D0D0F0", // pressed background color
              //     color: "#3B3B94",
              //   },

              splitButtonMenuButton: {
                backgroundColor: "#ffffff",
                selectors: {
                  ":hover": {
                    backgroundColor: "#E8E8F6", // hover for small arrow
                  },
                  ":active": {
                    backgroundColor: "#6264A7", // pressed for arrow
                    color: "white",
                  },
                },
              },
            }}
          />
          <span style={{ fontSize: 14, color: " #6264A7" }}>
            Current:{" "}
            <strong>
              {this.state.selectedProject
                ? this.state.selectedProject.charAt(0).toUpperCase() +
                  this.state.selectedProject.slice(1)
                : ""}
            </strong>
          </span>
        </Stack>
        <DetailsList
          items={this.state.items}
          columns={myColumns(
            this._updateProject,
            this._updateTask,
            this._toggleDescriptionExpand,
            this._updateDescription
          )}
          setKey="set"
          selection={this._selection}
          selectionMode={SelectionMode.multiple}
          checkButtonAriaLabel="select row"
          onRenderRow={this._onRenderRow}
        />
        <ButtonDefault selectAll={() => this._selection.setAllSelected(true)} />
      </Stack>
    );
  }
}

// Button props interface
export interface IButtonProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Custom styles for split IconButton
const customSplitButtonStyles: IButtonStyles = {
  splitButtonMenuButton: {
    backgroundColor: "white",
    width: 28,
    border: "none",
  },
  splitButtonMenuIcon: { fontSize: "7px" },
  splitButtonDivider: {
    backgroundColor: "#6264A7",
    width: 1,
    right: 26,
    position: "absolute",
    top: 4,
    bottom: 4,
  },
  splitButtonContainer: {
    selectors: {
      [HighContrastSelector]: { border: "none" },
      color: "#6264A7",
    },
  },
};

// Menu items for split button
const menuProps: IContextualMenuProps = {
  items: [
    {
      key: "emailMessage",
      text: "Email message",
      iconProps: { iconName: "Mail" },
    },
    {
      key: "calendarEvent",
      text: "Calendar event",
      iconProps: { iconName: "Calendar" },
    },
  ],
};

// Icon for buttons
const addIcon: IIconProps = { iconName: "Add" };

//Bold text Style
const boldStyle: Partial<ITextStyles> = {
  root: { fontWeight: FontWeights.semibold },
};

// Stack container styles
const stackTokens: IStackTokens = { childrenGap: 40 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: "960px",
    margin: "0 auto",
    textAlign: "center",
    color: " #515389ff",
  },
};

// ButtonDefault component
export const ButtonDefault: React.FunctionComponent<{
  selectAll?: () => void;
  disabled?: boolean;
  checked?: boolean;
}> = ({ selectAll, disabled, checked }) => {
  return (
    <Stack horizontal tokens={stackTokens}>
      <PrimaryButton
        text="Send to Asana"
        onClick={selectAll}
        allowDisabledFocus
        disabled={disabled}
        checked={checked}
        styles={{
          root: {
            backgroundColor: "#6264A7",
            color: "white",
            border: "none",
          },
          rootHovered: {
            backgroundColor: "#4e5087ff",
            color: "black",
          },
          rootPressed: {
            backgroundColor: "#E6F4EA",
            color: "black",
          },
          rootDisabled: {
            backgroundColor: "#f3f2f1",
            // color: "#a19f9d",
          },
        }}
      />
    </Stack>
  );
};

//Split IconButton
export const ButtonSplitCustom: React.FunctionComponent<IButtonProps> = (
  props
) => {
  const { disabled, checked } = props;

  return (
    <div>
      {/* <Label>Split button with icon and custom styles</Label> */}
      <IconButton
        split
        iconProps={addIcon}
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        styles={customSplitButtonStyles}
        menuProps={menuProps}
        ariaLabel="New item"
        onClick={_alertClicked}
        disabled={disabled}
        checked={checked}
      />
    </div>
  );
};

// Click handler for split button
function _alertClicked(): void {
  alert("Clicked");
}

// SearchBox
export const SearchBoxUnderlined = () => (
  <SearchBox placeholder="Search" underlined={true} />
);

//Main app Component
export const App: React.FunctionComponent = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={stackStyles}
      tokens={stackTokens}
    >
      {/* <img className="App-logo" src={logo} alt="logo" /> */}
      <Text variant="xxLarge" styles={boldStyle}>
        Task
      </Text>
      <Stack
        horizontal
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ childrenGap: 20 }}
      >
        <ButtonSplitCustom />
        <SearchBoxUnderlined />
      </Stack>
      <MyDetailsList />
      {/* <Text variant="large">
        For a guide on how to customize this project, check out the Fluent UI
        documentation.
      </Text>
      <Text variant="large" styles={boldStyle}>
        Essential links
      </Text>
      <Stack horizontal tokens={stackTokens} horizontalAlign="center">
        <Link href="https://developer.microsoft.com/en-us/fluentui#/get-started/web">
          Docs
        </Link>
        <Link href="https://stackoverflow.com/questions/tagged/office-ui-fabric">
          Stack Overflow
        </Link>
        <Link href="https://github.com/microsoft/fluentui/">Github</Link>
        <Link href="https://twitter.com/fluentui">Twitter</Link>
      </Stack>
      <Text variant="large" styles={boldStyle}>
        Design system
      </Text>
      <Stack horizontal tokens={stackTokens} horizontalAlign="center">
        <Link href="https://developer.microsoft.com/en-us/fluentui#/styles/web/icons">
          Icons
        </Link>
        <Link href="https://developer.microsoft.com/en-us/fluentui#/styles/web">
          Styles
        </Link>
        <Link href="https://aka.ms/themedesigner">Theme designer</Link>
      </Stack> */}
    </Stack>
  );
};
