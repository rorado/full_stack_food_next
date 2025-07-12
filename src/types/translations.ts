// type Field = {
//   label: string;
//   placeholder: string;
//   validation?: {
//     required: string;
//     invalid?: string;
//   };
// };

export type Translations = {
  Home: {
    Hero: {
      title: string;
      description: string;
      actions: {
        orderNow: string;
        learnMore: string;
      };
    };
    BestSellers: {
      title: string;
    };
  };
  AboutUs: {
    title: string;
    text1: string;
    text2: string;
  };
  ContactUs: {
    title: string;
    name: {
      label: string;
      input: string;
    };
    email: {
      label: string;
      input: string;
    };
    message: {
      label: string;
      input: string;
    };
    submit: string;
  };
  Cart: {
    title: string;
    cartProducts: {
      size: string;
      empty: string;
      subTotal: string;
      delivery: string;
      total: string;
    };
    checkout: {
      title: string;
      phone: {
        label: string;
        input: string;
      };
      streetAddress: {
        label: string;
        input: string;
      };
      postalCode: {
        label: string;
        input: string;
      };
      city: {
        label: string;
        input: string;
      };
      country: {
        label: string;
        input: string;
      };
      submit: {
        name: string;
      };
    };
    catrEmpty: {
      title: string;
    };
  };
  Navigition: {
    menu: string;
    about: string;
    contact: string;
    login: string;
    register: string;
    profile: string;
    admin: string;
  };
  Auth: {
    login: {
      title: string;
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      password: {
        label: string;
        placeholder: string;
      };
      submit: string;
      authPrompt: {
        message: string;
        signUpLinkText: string;
      };
    };
    register: {
      title: string;
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      password: {
        label: string;
        placeholder: string;
      };
      confirmPassword: {
        label: string;
        placeholder: string;
      };
      submit: string;
      authPrompt: {
        message: string;
        loginLinkText: string;
      };
    };
  };
  Validation: {
    nameRequired: string;
    validEmail: string;
    passwordMinLength: string;
    passwordMaxLength: string;
    confirmPasswordRequired: string;
    passwordMismatch: string;
  };
  Messages: {
    userNotFound: string;
    incorrectPassword: string;
    incorrectIdentifier: string;
    loginSuccessful: string;
    unexpectedError: string;
    userAlreadyExists: string;
    accountCreated: string;
    updateProfileSucess: string;
    categoryAdded: string;
    updatecategorySucess: string;
    deleteCategorySucess: string;
    productAdded: string;
    updateProductSucess: string;
    deleteProductSucess: string;
    updateUserSucess: string;
    deleteUserSucess: string;
  };
  Profile: {
    title: string;
    form: {
      name: {
        label: string;
        placeholder: string;
        validation: {
          required: string;
        };
      };
      email: {
        label: string;
        placeholder: string;
      };
      phone: {
        label: string;
        placeholder: string;
        validation: {
          required: string;
          invalid: string;
        };
      };
      address: {
        label: string;
        placeholder: string;
        validation: {
          required: string;
        };
      };
      postalCode: {
        label: string;
        placeholder: string;
        validation: {
          required: string;
          invalid: string;
        };
      };
      city: {
        label: string;
        placeholder: string;
        validation: {
          required: string;
        };
      };
      country: {
        label: string;
        placeholder: string;
        validation: {
          required: string;
        };
      };
    };
    submit: string;
  };
  Admin: {
    User: {
      title: string;
      columns: string;
      filter_emails: string;
      table: {
        name: string;
        email: string;
        role: string;
        create: string;
        ctr_next: string;
        ctr_prev: string;
        of: string;
        row: string;
        selected: string;
        actions: {
          name: string;
          delet_user: string;
          edit_user: string;
        };
      };
    };
    Products: {
      title: string;
      columns: string;
      filter_name: string;
      table: {
        name: string;
        description: string;
        price: string;
        create: string;
        ctr_next: string;
        ctr_prev: string;
        of: string;
        row: string;
        selected: string;
        actions: {
          name: string;
          copy_ID: string;
          delet_product: string;
          edit_product: string;
        };
      };
    };
    Categories: {
      title: string;
      Columns: {
        name: string;
        number_of_product: string;
      };
      filter_name: string;
      table: {
        name: string;
        number_of_product: string;
        actions: {
          name: string;
          copy_ID: string;
          delet_category: string;
        };
      };
    };
  };
};
