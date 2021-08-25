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

import { useParams, useHistory } from 'react-router-dom';

import {API} from 'services/api';
import {status} from 'services/enun';
import Select from 'components/select.component';
import TaskHook from './hook.js';

const TaskVkew = (props) => {

  const {
    id,
    values,
    slideValue,
    setValues,
    setSlideValue,
    handleChange,
    handleChangeSlide,
    handleDelete,
    handleOnSubmit
  } = TaskHook();

  // const history = useHistory();
  // const { id } = useParams();
  // const [values, setValues] = useState({
  //   title: "",
  //   description: "",
  //   deadline: ""
  // });
  // const [slideValue, setSlideValue] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  // const handleChangeSlide = (event, newValue) => {
  //   setSlideValue(newValue);
  // };

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };

  // const goToList = () => {
  //   history.push('/tasks');
  // }

  // const handleDelete = async () => {
  //   API.delete(`/task/delete/${id}`).then(() => {
  //     enqueueSnackbar('Tarefa apagada com sucesso', {variant: "success"});
  //     goToList();
  //   }).catch(() => {
  //     enqueueSnackbar('Não foi possível apagar a tarefa', {variant: "error"});
  //   });
  // }

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();

  //   const data = {
  //     title: values.title,
  //     category: {
  //       id: values.category
  //     },
  //     profile: {
  //       id: values.profile
  //     },
  //     description: values.description,
  //     status: values.status,
  //     progress: slideValue,
  //     deadline: values.deadline
  //   }
  //   if(!id){
  //     API.post('/task/new', data).then((response) => {
  //       enqueueSnackbar('Salvo com sucesso', {variant: "success"});
  //       goToList();
  //     }).catch((e) => {
  //       enqueueSnackbar('Não foi possível salvar a tarefa', {variant: "error"});
  //     });
  //   }else{
  //     data.id = id;

  //     API.put(`/task/edit/${id}`, data).then((response) => {
  //       enqueueSnackbar('Salvo com sucesso', {variant: "success"});
  //       goToList();
  //     }).catch((e) => {
  //       enqueueSnackbar('Não foi possível salvar a tarefa', {variant: "error"});
  //     });
  //   }
  // }

  useEffect(() => {
    if(id){
      API.get(`/task/${id}`).then((response) => {
        setValues({...response.data, category: response.data.category.id, profile: response.data.profile.login.id});
        setSlideValue(response.data.progress);
      }).catch((e) => {
        enqueueSnackbar('Não foi possível encontrar a tarefa', {variant: "error"});
      })
    }
  }, []);

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => handleOnSubmit(e)}
      {...props}
    >
      <Card>
        <CardHeader
          title="Tarefa"
          subheader="Crie/edite sua tarefa"
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
                minRows={1}
                onChange={handleChange}
                required
                value={'' || values.title}
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
                value={'' || values.profile}
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
                value={'' || values.deadline}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Select 
                value={'' || values.category}
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
                value={'' || values.status}
                variant="outlined"
              >
                <option>Selecione</option>
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
                value={'' || values.description}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: id ? 'space-between' : 'flex-end',
            width: '100%',
            p: 2
          }}
        >
          {id && (
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => handleDelete()}
            >
              Apagar tarefa
            </Button>
          )}
          

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