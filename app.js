Ext.application({
    name: 'Packt',
    requires: [
      'Packt.view.Login'
    ],

    views: [
      'Login'
    ],

    init: function(){
        splashscreen = Ext.getBody().mask('Loading Application...', 'splashscreen');
        splashscreen.addCls('splashscreen');
    },

    launch: function(){
        Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
            cls: 'x-splash-icon',
        });
        var task = new Ext.util.DelayedTask(function(){

            splashscreen.fadeOut({
                duration: 1000,
                remove:true
            });

            splashscreen.next().fadeOut({
                duration: 1000,
                remove:true,
                listeners: {
                  afteranimate: function(el, startTime, eOpts){
                    Ext.widget('login');
                  }
                }
            });
        });

        task.delay(2000);
    },


});
