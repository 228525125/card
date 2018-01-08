function post(command){
	$.post("play.do?cmd=send",{command:command},function(response){
    	var h = $('#command_output').html();
    	var p = $('input#command_input').attr('alt');
    	var res = '<p style="margin: 0;padding: 0;">'+p+'>'+response.result[0].msg+'</p>';
    	command_output_val(res);
    	
    	var data = response.result[0].data;
    	if(0<data.length){
    		for(var i=0;i<data.length;i++){
    			var sequence = data[i].sequence;
    			var jsonObject = $.parseJSON(data[i].command);    			
        		Invoker.response(jsonObject, data[i].sign);
            		
            	Context.setProcessSequence(sequence);
    			
    		}
    		
    		/* 间隔执行
    		var i = 0;
			var vID = setInterval(function(){
    	    	if(i<data.length){
    	    		var sequence = data[i].sequence;
        			var jsonObject = $.parseJSON(data[i].command);
        			var sign = data[i].sign;
        			Invoker.response(jsonObject, sign);
            		
                	Context.setProcessSequence(sequence);
    	    		
    	    		i++;
    	    	 }else{
    	    		 clearInterval(vID);
    	    	 }
    	     },1000);*/
    	}
    });
}

function syn(){
	$.post("play.do?cmd=syn",{sequence:Context.getProcessSequence()},function(response){
    	var h = $('#command_output').html();
    	var p = $('input#command_input').attr('alt');
    	var res = '<p style="margin: 0;padding: 0;">'+p+'>'+response.result[0].msg+'</p>';
    	command_output_val(res);
    	
    	var data = response.result[0].data;
    	if(0<data.length){
    		for(var i=0;i<data.length;i++){
    			var sequence = data[i].sequence;
    			
    			if(sequence>Context.getProcessSequence()){     //异步时，可能会出现重复发送同步命令，这样就避免了重复加载
	    			var jsonObject = $.parseJSON(data[i].command);
	    			if('Command_Show'==jsonObject.action ||
	    			    'Command_Select'==jsonObject.action || 
	    			    'Command_Query_Call'==jsonObject.action ||
	    			    'Command_Query_Attack'==jsonObject.action ||
	    			    'Command_Query_Move'==jsonObject.action ||
	    			    'Command_Query_Conjure'==jsonObject.action ||
	    			    'Command_Query_Apply'==jsonObject.action ||
	    			    'Command_Query_Execute'==jsonObject.action)
	    			;
	    			else
	    				Invoker.response(jsonObject, data[i].sign);
	        		
	        		Context.setProcessSequence(sequence);
    			}
    		}
    		
    		/* 间隔执行
    		var i = 0;
			var vID = setInterval(function(){
    	    	if(i<data.length){
    	    		var sequence = data[i].sequence;
    	    			
    	    		if(sequence>Context.getProcessSequence()){
    		    		var jsonObject = $.parseJSON(data[i].command);
    		    		var sign = data[i].sign;
    		    			
    		    		Invoker.response(jsonObject, sign);
    		    			
    		        	Context.setProcessSequence(sequence);
    	    		}
    	    		
    	    		i++;
    	    	 }else{
    	    		 clearInterval(vID);
    	    	 }
    	     },1000);*/
    	}
    });
}

function command_output_val(msg){
	var html = $('#command_output').html();
	$('#command_output').html(html+msg);
	var scrollTop = $("#command_output")[0].scrollHeight;
    $("#command_output").scrollTop(scrollTop+1);
}

function command_input_sub(){
	var html = $('#command_output').html();
	var value = $('input#command_input').val();
	if(null!=value && ''!=value){
		var player = $('input#command_input').attr('alt');
		var command = value;//.substring(player.length+1,value.length);
		var input = '<p style="margin: 0;padding: 0;">'+player+'>'+command+'</p>';
		$('input#command_input').val('');
		command_output_val(input);
	    
	    post(command);
	}
}

$(function(){
	
	//---------------------UI----------------------
	
	$("#command_input").focus();
	
	$("#command_input").die().live("keydown",function(event){      
        if(event.keyCode==13){  
        	command_input_sub();
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
		if(-1!=this.id.indexOf('ground'))
			$("#command_show0").html('当前坐标：'+this.id.substring(6,this.id.length));        
	});
	
	$("div").mousedown(function(event){
		if(-1!=this.id.indexOf('ground')){
			var position = this.id.substring(6,this.id.length);			
			var val = $("#command_input").val();
			
			if(-1!=val.indexOf('call') || -1!=val.indexOf('move') || -1!=val.indexOf('execute') || -1!=val.indexOf('pick')){
				val += 'ground place'+position+';';
			}else if(-1!=val.indexOf('attack') || -1!=val.indexOf('conjure') || -1!=val.indexOf('apply')){         //conjure和apply可能有很多种参数形式，这里只默认了一种，其他形式只有手动输入了
				val += 'ground place'+position+' corps;'; 
			}else{
				val = '';
			}
			
			val += 'select ground place'+position+';'         //+' corps;show';
			
			$("#command_input").val(val);
			command_input_sub();
		}
		/* usecard 取消
		if(-1!=this.id.indexOf('usecard')){
			var playerId =this.id.substring(7,this.id.length).split('_')[0];
			var position = this.id.substring(7,this.id.length).split('_')[1];
			if(Context.getOwn().id==playerId)
				post('select use card'+position+';show');
		}*/
	});
	
	$("#button_execute").click(function(){
		post('query execute');
		$("#command_input").val('execute ');
		$("#command_input").focus();
	});
	
	$("#button_move").click(function(){
		post('query move');
		$("#command_input").val('move ');
		$("#command_input").focus();
	});
	
	$("#button_attack").click(function(){
		post('query attack');
		$("#command_input").val('attack ');
		$("#command_input").focus();
	});
	
	$("#button_conjure").click(function(){
		post('query conjure');
		$("#command_input").val('conjure ');
		$("#command_input").focus();
	});
	
	$("#button_apply").click(function(){
		post('query apply');
		$("#command_input").val('apply ');
		$("#command_input").focus();
	});
	
	$("#button_pick").click(function(){
		post('query pick');
		$("#command_input").val('pick ');
		$("#command_input").focus();
	});
	
	var optionList=new Array($("#option0"),$("#option1"),$("#option2"),$("#option3"),$("#option4"),$("#option5"),$("#option6"),$("#option7"));
	
	for(var i=0;i<optionList.length;i++){
		optionList[i].mousedown(function(event){
			var val = 'select ' + this.title + ';show;';
			$("#command_input").val(val);
			command_input_sub();
		});
	}
	
	//--------------------UI end------------------
	
	//-------------------init-------------------
	var xBorder = 21;
	var yBorder = 12;
	
	var ground = new Ground();
	for(var i=1;i<=xBorder;i++){
		for(var n=1;n<=yBorder;n++){
			ground.addObserver(new GroundPlace(""+i+"8008"+n,$("#ground"+i+"8008"+n)));
		}
	}
	
	var notice = new Notice();
	notice.addObserver(new NoticePlace(0,$("#command_show0")));
	notice.addObserver(new NoticePlace(1,$("#command_show1")));
	notice.addObserver(new NoticePlace(2,$("#command_show2")));
	notice.addObserver(new NoticePlace(3,$("#command_show3")));
	
	/*var data1 = new Map();
	data1.put('Ground', ground);
	data1.put('Cemetery', ground);
	data1.put('TrickList', ground);
	data1.put('Notice', notice);
	var player1 = new Player('1',data1);         //硬编码，这里的1应该是player的id属性
	
	var data2 = new Map();
	data2.put('Ground', ground);
	data2.put('Cemetery', ground);
	data2.put('TrickList', ground);
	data2.put('Notice', notice);
	var player2 = new Player('2',data2);       //硬编码，这里的2应该是player的id属性
	
	var data3 = new Map();
	data3.put('Ground', ground);
	data3.put('Cemetery', ground);
	data3.put('TrickList', ground);
	data3.put('Notice', notice);
	var faction = new Player('9', data3);     //硬编码，9表示中立生物*/
	
	//context初始化
	//Context.addPlayer(player1);
	//Context.addPlayer(player2);
	//Context.addPlayer(faction);
	Context.setNotice(notice);
	Context.setOptionList(optionList);
	Context.put(Context.Ground,ground);
	
	ActionFactory.register('Player_Resource', 'new PlayerResourceAction(data.info,view)');
	ActionFactory.register('Player_Ration', 'new PlayerRationAction(data.info,view)');
	ActionFactory.register('Player_Bout', 'new PlayerBoutAction(data.info,view)');
	ActionFactory.register('Place_In', 'new PlaceInAction(data.info,view)');
	ActionFactory.register('Place_Out', 'new PlaceOutAction(data.info,view)');	
	ActionFactory.register('Command_Select', 'new CommandSelectAction(data.info,view)');
	ActionFactory.register('Command_Show', 'new CommandShowAction(data.info,view)');
	ActionFactory.register('Command_Reload', 'new CommandReloadAction(data.info,view)');
	ActionFactory.register('Command_Query_Call', 'new CommandQueryCallAction(data.info,view)');
	ActionFactory.register('Command_Query_Attack', 'new CommandQueryAttackAction(data.info,view)');
	ActionFactory.register('Command_Query_Move', 'new CommandQueryMoveAction(data.info,view)');
	ActionFactory.register('Command_Query_Conjure', 'new CommandQueryConjureAction(data.info,view)');
	ActionFactory.register('Command_Query_Apply', 'new CommandQueryApplyAction(data.info,view)');
	ActionFactory.register('Command_Query_Execute', 'new CommandQueryExecuteAction(data.info,view)');
	ActionFactory.register('Command_Query_Pick', 'new CommandQueryPickAction(data.info,view)');
	
	ActionFactory.register('Corps_Move', 'new LifeCardMoveAction(data.info,view)');
	ActionFactory.register('Corps_Call', 'new LifeCardCallAction(data.info,view)');
	ActionFactory.register('Corps_Death', 'new LifeCardDeathAction(data.info,view)');
	ActionFactory.register('Corps_Attack', 'new LifeCardAttackAction(data.info,view)');
	ActionFactory.register('Corps_Attacked', 'new LifeCardAttackedAction(data.info,view)');
	ActionFactory.register('Corps_Activate', 'new LifeCardActivateAction(data.info,view)');
	ActionFactory.register('Corps_Pick', 'new LifeCardPickAction(data.info,view)');
	ActionFactory.register('Corps_Hp', 'new LifeCardHpAction(data.info,view)');
	ActionFactory.register('Corps_Atk', 'new LifeCardAtkAction(data.info,view)');
	ActionFactory.register('Skill_UseSkill', 'new SkillAction(data.info,view)');
	ActionFactory.register('Treasure_Picked', 'new TreasurePickedAction(data.info,view)');
	ActionFactory.register('Buff_Affect', 'new BuffAffectAction(data.info,view)');
	ActionFactory.register('Buff_Effect', 'new BuffEffectAction(data.info,view)');
	ActionFactory.register('Buff_Invalid', 'new BuffInvalidAction(data.info,view)');
	ActionFactory.register('Context_Start', 'new ContextStartAction(data.info,view)');
	ActionFactory.register('Context_Control', 'new ContextControlAction(data.info,view)');
	ActionFactory.register('Context_Deploy', 'new ContextDeployAction(data.info,view)');
	ActionFactory.register('Context_Done', 'new ContextDoneAction(data.info,view)');
	ActionFactory.register('Context_Finish', 'new ContextFinishAction(data.info,view)');
	ActionFactory.register('Context_ControlQueue_Remove', 'new ControlQueueRemoveAction(data.info,view)');
	ActionFactory.register('Context_ControlQueue_Insert', 'new ControlQueueInsertAction(data.info,view)');
	ActionFactory.register('Context_ControlQueue_Refurbish', 'new ControlQueueRefurbishAction(data.info,view)');
	ActionFactory.register('Context_ControlQueue_Move', 'new ControlQueueMoveAction(data.info,view)');
	ActionFactory.register('Ground_LoadMap', 'new GroundLoadMapAction(data.info,view)');
	
	SkillActionFactory.register('AttackBack','new SkillAttackBackAction(info,view)');
	SkillActionFactory.register('Dodge', 'new SkillDodgeAction(info,view)');
	SkillActionFactory.register('Accurate', 'new SkillAccurateAction(info,view)');
	SkillActionFactory.register('Parry', 'new SkillParryAction(info,view)');
	SkillActionFactory.register('Thump', 'new SkillThumpAction(info,view)');
	SkillActionFactory.register('Puncture', 'new SkillPunctureAction(info,view)');
	SkillActionFactory.register('ShieldHit', 'new SkillShieldHitAction(info,view)');
	
	BuffEffectActionFactory.register('AttackLockBuff', 'new BuffAttackLockBuffEffectAction(info,view)');
	BuffAffectActionFactory.register('DizzyBuff', 'new BuffDizzyBuffAffectAction(info,view)');
	
	Glossary.add(Glossary.Attack_Mode,115,'近战');
	Glossary.add(Glossary.Attack_Mode,116,'远程');
	Glossary.add(Glossary.Death_Status,0,'live');
	Glossary.add(Glossary.Death_Status,1,'death');
	Glossary.add(Glossary.Death_Status,2,'exsits');
	Glossary.add(Glossary.ActiveSkill_Velocity,0,'瞬发');
	Glossary.add(Glossary.ActiveSkill_Velocity,1,'蓄力');
	Glossary.add(Glossary.ActiveSkill_Style,112,'法术');
	Glossary.add(Glossary.ActiveSkill_Style,111,'物理');
	Glossary.add(Glossary.Buff_Type,121,'受益');
	Glossary.add(Glossary.Buff_Type,122,'受损');
	Glossary.add(Glossary.Buff_Type,123,'中性');
	Glossary.add(Glossary.Card_Type,131,'随从');
	Glossary.add(Glossary.Card_Type,132,'法术');
	Glossary.add(Glossary.Move_Type,141,'步行');
	Glossary.add(Glossary.Move_Type,142,'骑行');
	Glossary.add(Glossary.Move_Type,143,'驾驶');
	Glossary.add(Glossary.Move_Type,144,'飞行');
	Glossary.add(Glossary.Move_Type,145,'传送');
	Glossary.add(Glossary.Building_Product,151,'刀剑');
	Glossary.add(Glossary.Building_Product,152,'护甲');
	Glossary.add(Glossary.Building_Product,153,'信仰');
	Glossary.add(Glossary.Building_Status,0,'Nothingness');
	Glossary.add(Glossary.Building_Status,1,'Build');
	Glossary.add(Glossary.Building_Status,2,'Complete');
	Glossary.add(Glossary.ActiveSkill_Func,201,'移动限制');
	Glossary.add(Glossary.ActiveSkill_Func,202,'直接伤害');
	Glossary.add(Glossary.ActiveSkill_Func,203,'召唤');
	Glossary.add(Glossary.ActiveSkill_Func,204,'治疗');
	Glossary.add(Glossary.ActiveSkill_Func,205,'损益');
	Glossary.add(Glossary.ActiveSkill_Func,206,'持续伤害');
	Glossary.add(Glossary.ActiveSkill_Func,207,'陷阱');
	Glossary.add(Glossary.ActiveSkill_Func,208,'冲锋');
	Glossary.add(Glossary.ActiveSkill_Func,209,'秘术');
	Glossary.add(Glossary.ActiveSkill_Func,299,'其他');
	Glossary.add(Glossary.Ground_Landform,401,'草地');
	Glossary.add(Glossary.Ground_Landform,402,'丘林');
	Glossary.add(Glossary.Ground_Landform,403,'森林');
	Glossary.add(Glossary.Ground_Landform,404,'河');
	Glossary.add(Glossary.Ground_Landform,405,'山');
	Glossary.add(Glossary.Ground_Landform,406,'沼泽');
	Glossary.add(Glossary.Ground_Landform,407,'旱地');
	Glossary.add(Glossary.Ground_Landform,408,'沙地');
	
	//对建筑进行分类
	Glossary.add(Glossary.Ground_Building,601,Glossary.Ground_Building_Town);
	Glossary.add(Glossary.Ground_Building,602,Glossary.Ground_Building_Call);
	Glossary.add(Glossary.Ground_Building,603,Glossary.Ground_Building_Call);
	Glossary.add(Glossary.Ground_Building,604,Glossary.Ground_Building_Call);
	Glossary.add(Glossary.Ground_Building,605,Glossary.Ground_Building_Call);
	Glossary.add(Glossary.Ground_Building,606,Glossary.Ground_Building_Call);
	Glossary.add(Glossary.Ground_Building,608,Glossary.Ground_Building_Call);
	Glossary.add(Glossary.Ground_Building,609,Glossary.Ground_Building_Call);
	
	Glossary.add(Glossary.Resource_Type,'701','金币');
	Glossary.add(Glossary.Resource_Type,'702','木材');
	Glossary.add(Glossary.Resource_Type,'703','石材');
	Glossary.add(Glossary.Resource_Type,'704','矿石');
	Glossary.add(Glossary.Resource_Type,'710','经验值');
	Glossary.add(Glossary.Resource_Type,'720','技能点');
	
	
	
	//-------------------init end-------------------
	
	Context.beginSyn();
});