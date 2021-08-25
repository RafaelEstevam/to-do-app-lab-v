import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Slider,
  Typography
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import {API} from 'services/api';

import Select from 'components/select.component';

const status = [
  {label: 'Para fazer', value: 'To do'},
  {label: 'Em progresso', value: 'In progress'},
  {label: 'Bloqueadas', value: 'Blocked'},
  {label: 'Concluidas', value: 'Finish'},
]

const TaskVkew = (props) => {
  const [values, setValues] = useState({});
  const [slideValue, setSlideValue] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeSlide = (event, newValue) => {
    setSlideValue(newValue);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: values.title,
      category: {
        id: values.category
      },
      profile: {
        id: values.profile
      },
      description: values.description,
      status: values.status,
      progress: slideValue,
      deadline: values.deadline
    }

    API.post('/task/new', data).then((response) => {
      enqueueSnackbar('Salvo com sucesso', {variant: "success"});
    }).catch((e) => {
      enqueueSnackbar('Não foi possível fazer a consulta', {variant: "error"});
    })
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={(e) => handleOnSubmit(e)}
      {...props}
    >
      <Card>
        <CardHeader
          title="Nova tarefa"
          subheader="Cadastre a nova tarefa"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Título"
                name="title"
                onChange={handleChange}
                required
                value={values.title}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography>
                Progresso: {`${slideValue}`} %
              </Typography>
              <Slider
                value={slideValue}
                onChange={handleChangeSlide}
                aria-labelledby="continuous-slider"
                min={0}
                max={100}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Select 
                value={values.profile}
                onChange={handleChange}
                api="/profile/all"
                label="Usuários"
                name="profile"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                label="Prazo"
                name="deadline"
                onChange={handleChange}
                type="date"
                value={values.deadline}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Select 
                value={values.category}
                onChange={handleChange}
                api="/category/all"
                label="Categoria"
                name="category"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                label="Status da tarefa"
                name="status"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.status}
                variant="outlined"
              >
                {status.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Descrição da tarefa"
                name="description"
                onChange={handleChange}
                rows={4}
                multiline
                value={values.description}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            p: 2
          }}
        >
          <Button
            color="secondary"
            variant="outlined"
          >
            Apagar tarefa
          </Button>

          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Salvar tarefa
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default TaskVkew;