export const REST="@rest"
export const BEFORE="@before"
export const AFTER="@after"
export const PATCH="@patch"
export const TO="@to"
export const OPERATION="@op"
export const INSERT="Insert"
export const DELETE="Delete"
export const PATCH_LIST="PatchList"
export const COPY_LIST="CopyList"
export const SWAP_VALUE="SwapValue"
export const KEEP_LIST="KeepList"
export const SWAP_LIST="SwapList"
export const INSERT_OPERATION="@insert"
export const DELETE_OPERATION="@delete"

export const SUBDOCUMENT_DOSENT_EXIST = "No SubDocument to display"


// diff titles
export const ORIGINAL_VALUE="Original UI"
export const CHANGED_VALUE="Changed UI"
export const ORIGINAL_UI_FRAME="originalUIFrame"
export const CHANGED_UI_FRAME="changedUIFrame"

// default select styles
export const DIFF_ORIGINAL_SELECT_STYLES = {
    control: (styles) => ({ ...styles, backgroundColor: '#f8d7da', borderColor: "#f5c2c7 !important", width: "100%" }),
    menu: (styles) => ({ ...styles, backgroundColor: '#f8d7da', width: "100%" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? "black"
          : isFocused
          ? "black"
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? "black"
              : "black"
            : undefined,
        },
      }
    },
    input: (styles) => {
      return {
          ...styles,
          color: '#842029'
      }
  },
  singleValue:(styles) => {
      return {
          ...styles,
          color: '#842029'
      }
  }
  }

export const DIFF_CHANGED_SELECT_STYLES={
    control: (styles) => ({ ...styles, backgroundColor: '#d1e7dd', borderColor: "#badbcc !important", width: "100%" }),
    menu: (styles) => ({ ...styles, backgroundColor: '#d1e7dd', width: "100%" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? "black"
          : isFocused
          ? "black"
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? "black"
              : "black"
            : undefined,
        },
      }
    },
    input: (styles) => {
      return {
          ...styles,
          color: '#0f5132'
      }
  },
  singleValue:(styles) => {
      return {
          ...styles,
          color: '#0f5132'
      }
  }
  }

// default json diff 
export const JSON_DIFF_STYLES={
  variables: {
      dark: {
          addedBackground: "#00bc8c"
      }
  }
}

