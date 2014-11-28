function post(command){
	$.post("play.do?cmd=send",{command:command},function(response){
    	var h = $('#command_output').html();
    	var p = $('input#command_input').attr('alt');
    	var res = '<p style="margin: 0;padding: 0;">'+p+'>'+response.result[0].msg+'</p>';
    	$('#command_output').html(h+res);
    	var scrollTop = $("#command_output")[0].scrollHeight;
        $("#command_output").scrollTop(scrollTop+1);
    	
    	var data = response.result[0].data;
    	if(0<data.length){
    		for(var i=0;i<data.length;i++){
    			var sequence = data[i].sequence;
    			
    			var jsonObject = $.parseJSON(data[i].command);    			
        		Invoker.response(jsonObject);
            		
            	Context.setProcessSequence(sequence);
    			
    		}
    	}
    });
}

function syn(){
	$.post("play.do?cmd=syn",{sequence:Context.getProcessSequence()},function(response){
    	var h = $('#command_output').html();
    	var p = $('input#command_input').attr('alt');
    	var res = '<p style="margin: 0;padding: 0;">'+p+'>'+response.result[0].msg+'</p>';
    	$('#command_output').html(h+res);
    	var scrollTop = $("#command_output")[0].scrollHeight;
        $("#command_output").scrollTop(scrollTop+1);
    	
    	var data = response.result[0].data;
    	if(0<data.length){
    		for(var i=0;i<data.length;i++){
    			var sequence = data[i].sequence;
    			
    			if(sequence>Context.getProcessSequence()){     //异步时，可能会出现重复发送同步命令，这样就避免了重复加载
	    			var jsonObject = $.parseJSON(data[i].command);    			
	    			Invoker.response(jsonObject);
	        		
	        		Context.setProcessSequence(sequence);
    			}
    		}
    	}
    });
}

$(function(){
	$("#command_input").focus();
	
	$("#command_input").die().live("keydown",function(event){      
        if(event.keyCode==13){  
        	var html = $('#command_output').html();
        	var value = $('input#command_input').val();
        	var player = $('input#command_input').attr('alt');
        	var command = value;//.substring(player.length+1,value.length);
        	var input = '<p style="margin: 0;padding: 0;">'+player+'>'+command+'</p>';
        	$('input#command_input').val('');
        	$('#command_output').html(html+input);
        	var scrollTop = $("#command_output")[0].scrollHeight;
            $("#command_output").scrollTop(scrollTop+1);
            
            post(command);
        }
    });
	
	$("#test").click(function(event){
		var player = Context.getControl();
		var sequence = player.getProcessSequence();
		$.post("play.do?cmd=syn",{sequence:sequence},function(response){
        	var data = response.result[0].data;
        	if(0<data.length){
        		for(var i=0;i<data.length;i++){
        			var sequence = data[i].sequence;
        			var command = $.parseJSON(data[i].command);
        			var player = Context.getPlayer(command.info.player.id);
        			
            		Invoker.receiveCommand(command);
            		
            		player.setProcessSequence(sequence);
        		}
        	}
        });
	});
	
	$("div").mouseover(function(event){
		if(-1!=this.id.indexOf('1001'))
			$("#command_show0").html('当前坐标：'+this.id.substring(6,this.id.length));        
	});
	$("div").mousedown(function(event){
		if(-1!=this.id.indexOf('1001')){
			var position = this.id.substring(6,this.id.length);
			post('select ground place'+position+' card;show;');
		}
		if(-1!=this.id.indexOf('usecard')){
			var playerId =this.id.substring(7,this.id.length).split('_')[0];
			var position = this.id.substring(7,this.id.length).split('_')[1];
			if(Context.getOwn().id==playerId)
				post('select use card'+position+';show;');
		}
	});
	
	//-------------------init-------------------
	
	var useCard1 = new UseCard();
	
	useCard1.addObserver(new UseCardPlace(0,$("#usecard1_0")));
	useCard1.addObserver(new UseCardPlace(1,$("#usecard1_1")));
	useCard1.addObserver(new UseCardPlace(2,$("#usecard1_2")));
	useCard1.addObserver(new UseCardPlace(3,$("#usecard1_3")));
	useCard1.addObserver(new UseCardPlace(4,$("#usecard1_4")));
	useCard1.addObserver(new UseCardPlace(5,$("#usecard1_5")));
	useCard1.addObserver(new UseCardPlace(6,$("#usecard1_6")));
	useCard1.addObserver(new UseCardPlace(7,$("#usecard1_7")));
	
	var useCard2 = new UseCard();
	
	useCard2.addObserver(new UseCardPlace(0,$("#usecard2_0")));
	useCard2.addObserver(new UseCardPlace(1,$("#usecard2_1")));
	useCard2.addObserver(new UseCardPlace(2,$("#usecard2_2")));
	useCard2.addObserver(new UseCardPlace(3,$("#usecard2_3")));
	useCard2.addObserver(new UseCardPlace(4,$("#usecard2_4")));
	useCard2.addObserver(new UseCardPlace(5,$("#usecard2_5")));
	useCard2.addObserver(new UseCardPlace(6,$("#usecard2_6")));
	useCard2.addObserver(new UseCardPlace(7,$("#usecard2_7")));
	
	var ground = new Ground();
	for(var i=1;i<=15;i++){
		for(var n=1;n<=15;n++){
			ground.addObserver(new GroundPlace(""+i+"1001"+n,$("#ground"+i+"1001"+n)));
		}
	}

	var cardGroup1 =  new CardGroup();
	cardGroup1.addObserver(new CardGroupPlace($("#cardgroup1")));
	
	var cardGroup2 =  new CardGroup();
	cardGroup2.addObserver(new CardGroupPlace($("#cardgroup2")));
	
	var notice = new Notice();
	notice.addObserver(new NoticePlace(0,$("#command_show0")));
	notice.addObserver(new NoticePlace(1,$("#command_show1")));
	notice.addObserver(new NoticePlace(2,$("#command_show2")));
	notice.addObserver(new NoticePlace(3,$("#command_show3")));
	
	var data1 = new Map();
	data1.put('CardGroup',cardGroup1);   //这里的key必须与Container中一致
	data1.put('UseCard', useCard1);
	data1.put('Ground', ground);
	data1.put('Cemetery', ground);
	data1.put('TrickList', ground);
	data1.put('Notice', notice);
	var player1 = new Player('1',data1);         //硬编码，这里的1应该是player的id属性
	
	var data2 = new Map();
	data2.put('CardGroup',cardGroup2);
	data2.put('UseCard', useCard2);
	data2.put('Ground', ground);
	data2.put('Cemetery', ground);
	data2.put('TrickList', ground);
	data2.put('Notice', notice);
	var player2 = new Player('2',data2);       //硬编码，这里的2应该是player的id属性
	
	Context.init(player1,player2);
	
	ActionFactory.register('Player_Power', 'new PlayerPowerAction(data.info,view)');
	ActionFactory.register('Container_UseCard_Add', 'new UseCardAddAction(data.info,view)');
	ActionFactory.register('Container_UseCard_Remove', 'new UseCardRemoveAction(data.info,view)');
	ActionFactory.register('Container_Place_In', 'new PlaceInAction(data.info,view)');
	ActionFactory.register('Container_Place_Out', 'new PlaceOutAction(data.info,view)');	
	ActionFactory.register('Command_Select', 'new CommandSelectAction(data.info,view)');
	ActionFactory.register('Command_Show', 'new CommandShowAction(data.info,view)');
	ActionFactory.register('Command_Reload', 'new CommandReloadAction(data.info,view)');
	ActionFactory.register('Command_Query_Call', 'new CommandQueryCallAction(data.info,view)');
	ActionFactory.register('Command_Query_Attack', 'new CommandQueryAttackAction(data.info,view)');
	ActionFactory.register('Command_Query_Move', 'new CommandQueryMoveAction(data.info,view)');
	ActionFactory.register('Command_Query_Conjure', 'new CommandQueryConjureAction(data.info,view)');	
	ActionFactory.register('Card_LifeCard_Action_Move', 'new LifeCardMoveAction(data.info,view)');
	ActionFactory.register('Card_LifeCard_Action_Call', 'new LifeCardCallAction(data.info,view)');
	ActionFactory.register('Card_LifeCard_Action_Death', 'new LifeCardDeathAction(data.info,view)');
	ActionFactory.register('Card_LifeCard_Action_Attack', 'new LifeCardAttackAction(data.info,view)');
	ActionFactory.register('Card_LifeCard_Action_Attacked', 'new LifeCardAttackedAction(data.info,view)');
	ActionFactory.register('Card_LifeCard_State_Activate', 'new LifeCardActivateAction(data.info,view)');
	ActionFactory.register('Card_LifeCard_State_Hp', 'new LifeCardHpAction(data.info,view)');
	ActionFactory.register('Card_LifeCard_State_Atk', 'new LifeCardAtkAction(data.info,view)');
	ActionFactory.register('Card_LifeCard_State_DamageChance', 'new LifeCardDamageChanceAction(data.info,view)');	
	ActionFactory.register('Card_LifeCard_Skill_Dodge', 'new SkillDodgeAction(data.info,view)');
	ActionFactory.register('Card_LifeCard_Skill_Accurate', 'new SkillAccurateAction(data.info,view)');
	ActionFactory.register('Card_LifeCard_Skill_AttackBack', 'new SkillAttackBackAction(data.info,view)');
	ActionFactory.register('Card_LifeCard_Skill_Parry', 'new SkillParryAction(data.info,view)');
	ActionFactory.register('Card_LifeCard_Skill_Thump', 'new SkillThumpAction(data.info,view)');
	ActionFactory.register('Context_Start', 'new ContextStartAction(data.info,view)');
	ActionFactory.register('Context_Control', 'new ContextControlAction(data.info,view)');
	ActionFactory.register('Context_Deploy', 'new ContextDeployAction(data.info,view)');
	ActionFactory.register('Context_Done', 'new ContextDoneAction(data.info,view)');
	ActionFactory.register('Context_Finish', 'new ContextFinishAction(data.info,view)');
	ActionFactory.register('Context_ControlQueue_Remove', 'new ControlQueueRemoveAction(data.info,view)');
	ActionFactory.register('Context_ControlQueue_Insert', 'new ControlQueueInsertAction(data.info,view)');
	
	//-------------------init end-------------------
	
	Context.beginSyn();
});