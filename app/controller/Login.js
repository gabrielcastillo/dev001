Ext.define('Packt.controller.Login', {
  extend: 'Ext.app.Controller',

  requires: [
    'Packt.util.MD5'
  ],

  views: [
    'Login',
    'authentication.CapslockTooltip',
  ],

  refs: [
    {
      ref: 'capslockTooltip',
      selector: 'capslocktooltip'
    }
  ],

  init: function(application){
    this.control({

      "login form button#submit": {
        click: this.onButtonClickSubmit
      },

      "login form button#cancel": {
        click: this.onButtonClickCancel
      },

      'login form textfield[name=password]': {
        keypress: this.onTextfieldKeyPress
      },

      'login form textfield': {
        specialkey: this.onTextfieldSpecialKey
      }

    });

  },

  onButtonClickSubmit: function(button, e, options){
    var formPanel = button.up('form');

    login   = button.up('login');
    user    = formPanel.down('textfield[name=user]').getValue();
    pass    = formPanel.down('textfield[name=password]').getValue();


    if( formPanel.getForm().isValid() ){
      
      pass = Packt.util.MD5.encode(pass);

      Ext.get(login.getEl()).mask('Authenticating... Please wait...', 'loading');

      Ext.Ajax.request({
        url: 'php/login.php',
        params: {
          user: user,
          pass: pass,
        },
        failure: function(conn, response, options, eOpts){
          Ext.get(login.getEl()).unmask();
          Ext.Msg.show({
            title: 'Error!',
            msg: conn.responseText,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
          });
        },
        success: function(conn, response, options, eOpts){
          Ext.get(login.getEl()).unmask();
          var result = Ext.JSON.decode(conn.responseText, true);

          if( !result ){
            result = {},
            result.success = false;
            result.msg = conn.responseText;
          }

          if( result.success ){
            login.close();
            //Ext.create('Packt.view.MyViewport');
          }else{
            Ext.Msg.show({
              title: 'Fail!',
              msg: result.msg,
              icon: Ext.Msg.ERROR,
              buttons: Ext.Msg.OK
            });
          }

        },
      });
    }
  },

  onButtonClickCancel: function(button, e, options){
    button.up('form').getForm().reset();
    var formPanel = button.up('login');
    formPanel.down('textfield[name=user]').focus();
  },

  onTextfieldSpecialKey: function(field, e, options) {
    if(e.getKey() == e.ENTER){
      var submitBtn = field.up('form').down('button#submit');
      submitBtn.fireEvent('click', submitBtn, e, options);
    }
  },

  onTextfieldKeyPress: function(field, e, options) {
    var charCode = e.getCharCode();

    if( (e.shiftKey && charCode >= 97 && charCode <= 122 ) || (!e.shiftKey && charCode >= 65 && charCode <= 90) ){
      if(this.getCapslockTooltip() === undefined){
        Ext.widget('capslocktooltip');
      }
      this.getCapslockTooltip().show();
    }else{
      if(this.getCapslockTooltip() !== undefined){
        this.getCapslockTooltip().hide();
      }
    }
  }




});














