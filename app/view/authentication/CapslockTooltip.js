Ext.define('Packt.view.authentication.CapslockTooltip', {
  extend: 'Ext.tip.QuickTip',
  alias: 'widget.capslocktooltip',

  target: 'password',
  anchor: 'top',
  anchorOffset: 60,
  width: 300,
  dismissDelay: 0,
  autoHide: false,
  title: '<div>Notice!</div>',
  html: '<div>Caps Lock Is On!</div>',
});