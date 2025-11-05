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
import {
  DetailsList,
  DetailsRow,
  IDetailsRowStyles,
  IDetailsRowProps,
  SelectionMode,
  getTheme,
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
  status: string;
}

// Generate sample data
const createMyItems = (count: number): IMyItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    key: `item-${i}`,
    project: `Project ${i}`,
    task: `Task ${i}`,
    assigned: `https://i.pravatar.cc/40?img=${i}`, // example avatar image
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
    status: i % 2 === 0 ? "In Progress" : "Completed",
  }));
};

// Define columns for the DetailsList
const myColumns: IColumn[] = [
  {
    key: "project",
    name: "Project",
    fieldName: "project",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "task",
    name: "Task",
    fieldName: "task",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "assigned",
    name: "Assigned",
    fieldName: "assigned",
    minWidth: 50,
    maxWidth: 80,
    isResizable: false,
    onRender: (item: IMyItem) => (
      <img src={item.assigned} alt="assigned" style={{ borderRadius: "50%" }} />
    ),
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
    key: "status",
    name: "Status",
    fieldName: "status",
    minWidth: 80,
    maxWidth: 120,
  },
  {
    key: "actions",
    name: "Actions",
    fieldName: "actions",
    minWidth: 80,
    maxWidth: 100,
    onRender: (item: IMyItem) => {
      // Render Add and Delete buttons for each row
      const addIcon: IIconProps = { iconName: "Add" };
      const deleteIcon: IIconProps = { iconName: "Delete" };
      return (
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <IconButton
            iconProps={addIcon}
            title="Add"
            ariaLabel="Add"
            onClick={() => alert(`Add clicked for ${item.task}`)}
          />
          <IconButton
            iconProps={deleteIcon}
            title="Delete"
            ariaLabel="Delete"
            onClick={() => alert(`Delete clicked for ${item.task}`)}
          />
        </Stack>
      );
    },
  },
];

// DetailsList example component
export class MyDetailsList extends React.Component {
  private _items: IMyItem[];

  constructor(props: {}) {
    super(props);
    this._items = createMyItems(10); // create 50 rows
  }

  render() {
    return (
      <DetailsList
        items={this._items}
        columns={myColumns}
        setKey="set"
        selectionMode={SelectionMode.multiple} // or SelectionMode.multiple for multiple selection
        checkButtonAriaLabel="select row"
        onRenderRow={this._onRenderRow}
      />
    );
  }

  private _onRenderRow = (props?: IDetailsRowProps) => {
    const customStyles: Partial<IDetailsRowStyles> = {};
    if (props) {
      if (props.itemIndex % 2 === 0) {
        customStyles.root = { backgroundColor: theme.palette.themeLighterAlt };
      }
      return <DetailsRow {...props} styles={customStyles} />;
    }
    return null;
  };
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
    backgroundColor: "#c8c8c8",
    width: 1,
    right: 26,
    position: "absolute",
    top: 4,
    bottom: 4,
  },
  splitButtonContainer: {
    selectors: {
      [HighContrastSelector]: { border: "none" },
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
    color: "#605e5c",
  },
};

//Primary Button
export const ButtonDefault: React.FunctionComponent<IButtonProps> = ({
  disabled,
  checked,
}) => {
  const handleClick = (): void => alert("Clicked");

  return (
    <Stack horizontal tokens={stackTokens}>
      {/* <DefaultButton
        text="Secondary"
        onClick={handleClick}
        allowDisabledFocus
        disabled={disabled}
        checked={checked}
      /> */}
      <PrimaryButton
        text="Send to Asana"
        onClick={handleClick}
        allowDisabledFocus
        disabled={disabled}
        checked={checked}
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
        <ButtonDefault />
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
