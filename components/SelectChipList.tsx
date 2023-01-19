import { Add } from '@mui/icons-material';
import {
  Button,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import theme from '../styles/theme/Theme';
import { SelectListHook } from '../utility/hooks/selectList';
import { BackdropModal } from './BackdropModal';

export interface SelectChipListProps {
  updateSelected: (value: string) => void;
  options: Map<string, boolean>;
}

export function SelectChipList({
  hook,
  label,
  propertyName,
}: {
  /**
   * Handles all operations to handle selecting options.
   */
  hook: SelectListHook;
  /**
   * Label for the form.
   */
  label: string;
  /**
   * Property name to be used in popup ( should be singular)
   */
  propertyName: string;
}) {
  const chips: Array<any> = [];

  hook.values.options.forEach((option, index) => {
    chips.push(
      <Button
        key={index}
        onClick={() => hook.updateSelected(option)}
        color="primary"
        variant={hook.isSelected(option) ? 'contained' : 'text'}
        sx={$chip}
      >
        <div>
          <text style={{ fontSize: 16, fontStyle: 'bold' }}>{option}</text>
        </div>
      </Button>
    );
  });

  return (
    <>
      <div style={$container}>
        <FormLabel> {label}</FormLabel>
        <div style={$chipContainer}>
          {chips}
          <Button
            onClick={() => hook.togglePopUp()}
            sx={$addChip}
            variant="outlined"
          >
            <Add />
          </Button>
        </div>
      </div>

      <BackdropModal
        isOpen={hook.values.isPopUpVisible}
        toggleShow={() => hook.togglePopUp()}
      >
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
            width: '300px',
            gap: 10,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            {`Add  custom ${label}`}
          </Typography>
          <TextField
            color="secondary"
            label={`${propertyName}`}
            onChange={(e) => {
              hook.updateOptionInput(e.target.value);
            }}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => hook.addOption()}
          >
            add
          </Button>
        </div>
      </BackdropModal>
    </>
  );
}

const $chipContainer: React.CSSProperties = {
  flexWrap: 'wrap',
  flexDirection: 'row',
  width: '100%',
  alignContent: 'center',
  alignItems: 'center',
  marginTop: 2,
  marginBottom: 2,
};

const $chip: React.CSSProperties = {
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: 3,
  paddingRight: 3,
  marginLeft: 1,
  marginRight: 1,
  alignSelf: 'center',
};

const $addChip: React.CSSProperties = {
  borderColor: theme.palette.primary.contrastText,
  backgroundColor: 'transparent',
  borderWidth: '1px',
  color: theme.palette.primary.contrastText,
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: 3,
  paddingRight: 3,
  marginLeft: 1,
  marginRight: 1,
  boxShadow: 'none',
  alignSelf: 'center',
};

const $selectedChip: React.CSSProperties = {
  margin: 4,
  border: 'none',
  backgroundColor: '#9996BC',
  paddingTop: 15,
  paddingBottom: 15,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 3,
  alignSelf: 'center',
};

const $container: React.CSSProperties = {
  flexDirection: 'column',
  width: '100%',
  marginTop: 10,
  marginBottom: 10,
};
