UploadFormPanel = Ext.extend(Ext.form.FormPanel, {
    width: 343,
    height: 180,
    padding: 10,
    labelWidth: 70,
    labelAlign: 'right',
    border: false,
    frame: true,
    fileUpload: true,
    initComponent: function() {
        this.defaults = {
            width: 200
        };
        this.items = [
            {
                xtype: 'fileuploadfield',
                anchor: '90%',
                id: 'map',
                emptyText: '选择一个文件',
                fieldLabel: '地图资料',
                name: 'map',
                buttonText: '',
                buttonCfg: {
                    iconCls: 'uploadIcon'
                }
            },
            {
                xtype: 'fileuploadfield',
                anchor: '90%',
                id: 'life',
                emptyText: '选择一个文件',
                fieldLabel: '卡片信息',
                name: 'life',
                buttonText: '',
                buttonCfg: {
                    iconCls: 'uploadIcon'
                }
            },
            {
                xtype: 'fileuploadfield',
                anchor: '90%',
                id: 'attack',
                emptyText: '选择一个文件',
                fieldLabel: '攻防对照',
                name: 'attack',
                buttonText: '',
                buttonCfg: {
                    iconCls: 'uploadIcon'
                }
            },
            {
                xtype: 'fileuploadfield',
                anchor: '90%',
                id: 'user',
                emptyText: '选择一个文件',
                fieldLabel: '用户资料',
                name: 'user',
                buttonText: '',
                buttonCfg: {
                    iconCls: 'uploadIcon'
                }
            }
        ];
        UploadFormPanel.superclass.initComponent.call(this);

    }
});
