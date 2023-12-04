Game.achievements = (function() {

	'use strict';

	var instance = {};

	instance.dataVersion = 6;

	instance.nextId = 0;

	instance.rank = 1;
	instance.xp = 0;

	instance.entries = {};
	instance.achievementCount = 0;
	instance.achievementCountIncludingTiers = 0;

	instance.initialise = function() {
		for (var id in Game.achievementsData) {
			var data = Game.achievementsData[id];
			this.entries[id] = $.extend({}, data, {
				id: id,
				category: data.categoryInstance.title,
				iconPath: Game.constants.iconPath,
				iconExtension: Game.constants.iconExtension,
				unlocked: -1,
				progressDisplay: -1,
				displayNeedsUpdate: true
			});
			if (data.brackets === undefined) {
				this.entries[id].brackets = data.categoryInstance.brackets;
			}

			this.achievementCount++;
			this.achievementCountIncludingTiers += this.entries[id].brackets.length;
		}
		
		console.debug("Loaded " + this.achievementCount + " (" + this.achievementCountIncludingTiers +") Achievements");
	};

	instance.getAchievementTitle = function(data, for_tooltip) {
		if(data.unlocked === data.brackets.length - 1) {
			var title = data.title.replace('%s', Game.settings.format(data.brackets[data.unlocked]));
			if(for_tooltip === true) {
				title += " (Completed)";
			}
			return title;
		} else {
			var title = data.title.replace('%s', Game.settings.format(data.brackets[data.unlocked+1]));
			if(for_tooltip === true) {
				标题+='('+data.progressDisplay+'%)';
			}
			返回标题；
		}
	};

	实例.更新=函数（增量）{
		for(this.entries 中的 var id) {
			var data = this.entries[id];
			var 括号 = data.brackets[data.unlocked + 1];var 括号 = data.brackets[data.unlocked + 1];

			if(data.unlocked < data.brackets.length - 1 && data.evaluator(bracket)) {if(data.unlocked < data.brackets.length - 1 && data.evaluator(bracket)) {
				Game.notifySuccess("成就", this.getAchievementTitle(data, false));notifySuccess("成就", this.getAchievementTitle(data, false));

				this.unlock(id, data.unlocked + 1);this.unlock(id, data.unlocked + 1);

				newUnlock('更多');newUnlock('更多');
			} else if(data.unlocked < data.brackets.length - 1) {} else if(data.unlocked < data.brackets.length - 1) {
				var ProgressDisplay = Math.floor(100 * data.progressEvaluator(括号));var ProgressDisplay = Math.floor(100 * data.progressEvaluator(bracket));
				this.updateProgress(id, 详细显示);this.updateProgress(id, 详细显示);
			}}
		}}
	};};

	实例.unlock = 函数(id, 层) {unlock = 函数(id, 层) {
		if(this.entries[id].unlocked < 层) {if(this.entries[id].unlocked < 层) {
			this.entries[id].unlocked = 层；this.entries[id].unlocked = 层；
			this.entries[id].displayNeedsUpdate = true;this.entries[id].displayNeedsUpdate = true;
		}}
	};};

	instance.updateProgress = 函数(id, 详细信息) {updateProgress = 函数(id, 详细信息) {
		if(this.entries[id].progressDisplay != 详细信息) {if(this.entries[id].progressDisplay != 详细信息) {
			this.entries[id].progressDisplay = 详细信息；this.entries[id].progressDisplay = 详细信息；
			this.entries[id].displayNeedsUpdate = true;this.entries[id].displayNeedsUpdate = true;
		}}
	};};

	实例.保存=函数（数据）{保存=函数（数据）{
		data.achievements = {版本：this.dataVersion，边界：{}}；achievements = {版本：this.dataVersion，边界：{}}；
		for(this.entries 中的 var id) {for(this.entries 中的 var id) {
			if(this.entries[id].unlocked >= 0) {if(this.entries[id].unlocked >= 0) {
				data.achievements.entries[id] = {achievements.entries[id] = {
					解锁：this.entries[id].unlocked解锁：this.entries[id].unlocked
				};};
			}}
		}}
	};};

	实例.load = 函数(数据) {load = 函数(数据) {
		if (data.achievements && data.achievements.version) {if (data.achievements && data.achievements.version) {
			开关（数据.成就.版本）{成就.版本）{
				情况6: this.loadV6(data); 休息；this.loadV6(data); 休息；
				默认值：console.debug("无法从版本加载已保存的成就数据" + data.achievements.version); 休息；debug("无法从版本加载已保存的成就数据" + data.achievements.version); 休息；
			}}
		}}
	};};

	实例.loadV6 = 函数（数据）{loadV6 = 函数（数据）{
		if (数据.成就) {if (数据.成就) {
			for (data.achievements.entries 中的 var id) {for (data.achievements.entries 中的 var id) {
				if (this.entries[id]) {if (this.entries[id]) {
					if (data.achievements.entries[id].unlocked >= 0) {if (data.achievements.entries[id].unlocked >= 0) {
						this.unlock(id, data.achievements.entries[id].unlocked);this.unlock(id, data.achievements.entries[id].unlocked);this.unlock(id, data.achievements.entries[id].unlocked);this.unlock(id, data.achievements.entries[id].unlocked);
					}}}}
				}}}}
			}}}}
		}}}}
	};};};};

	返回实例；

}())} ( ) );
