// https://docs.svar.dev/svelte/grid/api/overview/api_overview

declare module "wx-svelte-grid" {
  /**
   * @description
   * Object with footer or header settings:
   *    id(string) - a column ID
   *    text (text) - (optional) a header label
   *    css (string) - (optional) the name of a css class to be applied to a header
   *    cell - (optional) the name of a custom svelte component to be applied
   *           inside a header cell; e.g., cell: CheckboxCell
   *    rowspan (number) - (optional) the number of rows a header should span
   *    colspan (number) - (optional) the number of columns a header should span
   *    collapsible (boolean | "first") - (optional) if set to true, a column
   *                can be fully collapsed; if set to "first", the first column
   *                will be visible in collapsed state; by default, it's set to false
   *    collapsed (boolean) - (optional) defines the initial state of a
   *              collapsible column. false by default
   *    vertical (boolean) - (optional) if set to true, a header label is displayed
   *             vertically; by default, it's set to false
   *    filter - (optional) an object with the next filter settings:
   *          type (string or object) - (required) it can be "text" or "richselect"
   *          config (object) - (optional) an object with the next filter configuration parameters:
   *                template - (optional) applies the filter template to a header
   *                           and defines how the options in the filter are displayed.
   *                           The function takes an option object as input and
   *                           returns a string that will be used as the display
   *                           value for that option.
   *                options (array) - (optional) the list of filter options with
   *                        next parameters for each option:
   *                      id (string | number) - (required) an id of the option
   *                      label (string) - (required) a label for a filter option
   *                handler - (optional) function handler:(value: any, filter: any) => boolean: value
   *                        is the value of the column that is filtered and filter
   *                        is the selected filter value. The function should
   *                        return a boolean indicating whether the value passes the filter or not.
   */
  interface FooterHeader {
    id: string;
    text?: string;
    css?: string;
    cell?: object;
    rowspan?: number;
    colspan?: number;
    collapsible?: boolean | "first";
    collapsed?: boolean;
    vertical?: boolean;
    filter?: {
      type: "text" | "richselect";
      config?: {
        template?: (obj) => string;
        options?: { id: string | number; label: string }[];
        handler?: (any, arg1: any) => boolean;
      };
    };
  }

  // https://docs.svar.dev/svelte/grid/api/properties/columnStyle#parameters
  interface Column {
    /**
     * @description
     * id - (required) the id of a column
     */
    id: string;

    /**
     * @description
     * width - (required) the width of a column in pixels; a default value is 160
     */
    width: number;

    /**
     * @description
     * flexgrow - (optional) specifies how much space (width) relative to the
     * table width the column will take (it will take no effect on columns with
     * the set width); the property is specified as a number (if flexgrow is
     * set to 1 in one column only, the column will take the full available
     * table width)
     */
    flexgrow?: number;

    /**
     * @description
     * editor - (optional) it can be a string with the editor type (see types
     * below) or an object with the next parameters:
     *    type (string) - the type of a field which can be one of the
     *                    following: "text" | "combo" | "datepicker" | "richselect"
     *    config - (optional) an object or a component name with editor
     *             configuration settings (for all editor types except "text"):
     *       cell - (optional) any custom component
     *       template - (optional) the function that takes an option and returns
     *                   a string to display (template?:(obj) => string)
     */
    editor?:
      | "text"
      | "combo"
      | "datepicker"
      | "richselect"
      | {
          type: "text" | "combo" | "datepicker" | "richselect";
          config?: { cell?: object; template?: (obj) => string };
        };

    /**
     * @description
     * setter - (optional) sets the received value to a specified column
     */
    setter?: (obj: {}, value: any) => void;

    /**
     * @description
     * getter - (optional) gets the column value
     */
    getter?: (obj: {}) => unknown;

    /**
     * @description
     * hidden - (optional) allows hiding a column by setting its value to true;
     * it's set to false (not hidden) by default
     */
    hidden?: boolean;

    /**
     * @description
     * options - (optional) an array of objects with data (options) for the column fields:
     *    id (string | number) - an option item ID
     *    label (string) - an option label
     */
    options?: { id: string | number; label: string }[];

    /**
     * @description
     * header - (optional) a header label or object with header settings.
     */
    header?: string | FooterHeader;

    /**
     * @description
     * footer - a header label or an object with footer settings which are the same as the header settings
     */
    footer?: string | FooterHeader;

    /**
     * @description
     * resize -
     */
    resize?: boolean;

    /**
     * @description
     * treetoggle - if set to true, enables displaying data in a hierarchical format
     * with collapsible rows; the default value is false
     */
    treetoggle?: boolean;

    /**
     * @description
     * cell - (optional) the name of a custom svelte component to be applied inside
     * a cell; e.g., cell: CheckboxCell
     */
    cell?: unknown;

    /**
     * @description
     * tooltip - (optional) if true (default), adds a tooltip to a column; a
     * function (obj: any) => any can be passed to the parameter value; the function
     * should take an object to be processed as an argument and return the processed value
     */
    tooltip?: boolean | ((obj) => unknown);

    /**
     * @description
     * template - (optional) applies a template to a column; it's a function that
     *            takes an object with the next parameters:
     *    value - cell value
     *    row - row object (data item)
     *    column - column object
     *
     *    The function returns a string.
     */
    template?: (value: unknown, row: object, column: object) => string;

    /**
     * @description
     * draggable - (optional) allows adding the drag handle (appears to the left
     * of text in a row) in case the reorder property is enabled; to add the handle,
     * set draggable to true; the parameter can be a function that takes the row and
     * column objects and returns boolean; if draggable is set, a user can move rows
     * only by dragging the handle.
     */
    draggable?: boolean;
  }
  interface Row {
    id: number;
    [key: string]: unknown;
  }
  interface Cell {
    id: string;
    width: number;
    flexgrow?: number;
    editor?: string | any;
    setter?: (obj: {}, value) => void;
    getter?: (obj: {}) => unknown;
    hidden?: boolean;
    options?: [];
    header?: string | [];
    footer?: string | [];
    resize?: boolean;
    treetoggle?: boolean;
    cell?: any;
    css?: string;
    tooltip?: boolean | ((obj: any) => any);
    template?: any;
  }
  interface State {
    columns: []; // an array with columns data
    data: []; // an array with data for the table
    dynamic: object; // an object with the number of rows in a dynamic dataset
    editor: object; // an object with data for the open editor
    filter: (obj: any) => boolean; // the filtering function; the filter-rows action handler
    scroll: object; // on object with the scroll configuration
    selectedRows: []; // an array with the ids of the selected rows
    sizes: object; // an object with the table sizes configuration
    sort: object; // an array with the sorting configuration
    split: number; // the number of frozen columns
    tree: boolean; // tree structure state
    flatData: []; // actual data;in case of the tree structure,it's a plain dataset with the "level" marker to specify each item's level in hierarchy
    filterValues: object;
  }

  interface SelectRow {
    id: string | number; // id - (required) the ID of a row that is selected
    toggle?: boolean; // toggle - (optional) if set to true, enables the switching of the row state between selected and unselected. If one row is selected, in GUI holding Ctrl + left click unselects the row. In the multiselect mode, it will add the row to the selected list.
    range?: boolean; // range - (optional) if set to true, enables selecting the range of rows starting from the first selected row to the specified row id. In GUI holding Shift + left click will select the range of rows.
    mode?: boolean; // mode - (optional) Available if toggle is enabled. If mode is set to true, it makes the row selected. If false, the row state is unselected. It's useful when the row state is unknown and you want to make sure the row is selected/unselected.
    show?: boolean; // show - (optional) if set to true, the table will be scrolled to the specified row ID
    column?: string | number; // column - (optional) the id of a column; if show is set to true, this parameter allows specifying the exact row position to be applied by the scroll bar
  }

  import type { SvelteComponent } from "svelte";

  class Grid extends SvelteComponent {
    // https://docs.svar.dev/svelte/grid/api/overview/methods_overview
    getState(): State;
    on(event: "select-row", handler: (event) => void): void;
    // https://docs.svar.dev/svelte/grid/api/overview/properties_overview
    autoConfig?: boolean; // Enables creating a table structure automatically with default or basic columns settings
    autoRowHeight?: boolean; // Enables the autoheight of rows in the table
    cellStyle?: (row: Row, column: Column) => string; // Defines the style of a cell in the table
    columnStyle?: (column: Column) => string; // Defines the style of a column in the table
    columns?: Column[]; // An array of objects with columns settings
    data?: unknown[]; // An array of objects with data for the Grid
    dynamic?: {
      rowCount: number;
      columnCount: number;
    }; // Enables dynamic data loading
    footer?: boolean; // Enables a footer in the table
    header?: boolean; // Enables a header in the table
    multiselect?: boolean; // Enables selecting multiple rows using SHIFT or CTRL with the button click
    overlay?: string | {}; // Shows an overlay when the table is empty or in the loading state
    reorder?: boolean; // Enables row reordering via drag-n-drop
    rowStyle?: (row: Row) => string; // Defines the style of a row in the table
    select?: boolean; // Enables/disables the possibilty to select rows on click.
    selectedRows?: Array<string | number>; // Marks rows as selected
    sizes?: {
      rowHeight?: number;
      columnWidth?: number;
      headerHeight?: number;
      footerHeight?: number;
    }; // An object with the table sizes settings (width and height)
    split?: { left: number }; // Allows freezing the leftmost columns while scrolling
    tree?: boolean; // Enables the tree structure in the table
    /**
     * The following were apparently left out of the api doc???
     */
    init?: any;
    intercept?: any;
    onselectrow?: any;
  }

  /**
   * Grid Actions
   * https://docs.svar.dev/svelte/grid/api/overview/actions_overview/
   */
}
