export default {
  palette: {
    primary: {
      light: '#33a095',
      main: '#00897b',
      dark: '#005f56',
      contrastText: '#fff'
    },
    secondary: {
      light: '#3492ca',
      main: '#0277bd',
      dark: '#015384',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 20px auto'
  },
  button: {
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    margin: 5
  },
  progress: {
    position: 'absolute'
  },
  invisibleRule: {
    border: 'none',
    margin: 4
  },
  visibleRule: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 5
  },
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '40%',
        left: '45%',
        visibility: 'hidden'
      }
    },
    '& .image-wrapper:hover': {
      '& button': {
        visibility: 'visible'
      },
      '& .profile-image': {
        opacity: 0.4
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00897b'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
  // profile: {
  //   '& .image-wrapper': {
  //     textAlign: 'center',
  //     position: 'relative'
  //   },
  //   '& .profile-image': {
  //     width: 200,
  //     height: 200,
  //     objectFit: 'cover',
  //     maxWidth: '100%',
  //     borderRadius: '50%'
  //   },
  //   '& .profile-details': {
  //     textAlign: 'center',
  //     '& span, svg': {
  //       verticalAlign: 'middle'
  //     },
  //     '& a': {
  //       color: '#00897b'
  //     }
  //   },
  //   '& hr': {
  //     border: 'none',
  //     margin: '0 0 10px 0'
  //   }
  // }
};
