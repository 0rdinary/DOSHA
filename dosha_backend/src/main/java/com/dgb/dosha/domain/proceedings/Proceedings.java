package com.dgb.dosha.domain.proceedings;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Proceedings {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length=12)
	private String date;
	
	@Column(nullable = false, length=30)
	private String location;
	
	@Column(nullable = false, length=30)
	private String type;
	
	@Column(nullable = false)
	private String contents;
	
	@Column
	private String others;
	
	@Column
	private String notes;
	
	@Column(nullable = false)
	private boolean completed;
	
	@OneToMany(mappedBy="proceedings", cascade = CascadeType.ALL)
	private List<Member> member;
	
	
	public ProceedingsDto toDto() {
		return ProceedingsDto.builder()
				.id(id)
				.date(date)
				.location(location)
				.type(type)
				.contents(contents)
				.others(others)
				.notes(notes)
				.completed(completed)
				.memberIds(member.stream()
						.map((data) -> data.getId())
						.collect(Collectors.toList()))
				.memberDtos(member.stream()
						.map(Member::toDto)
						.collect(Collectors.toList()))
				.build();
	}
}
